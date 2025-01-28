import OpenAI from "openai";
import dotenv from "dotenv";
import Code from "../models/code.js";
import User from "../../users/models/users.js";
dotenv.config();

const openai = new OpenAI({
  organization: process.env.ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const reprompt = new OpenAI({
  organization: process.env.ORG,
  apiKey: process.env.REPROMPT_API_KEY,
});

export const createChat = async (req, res) => {
  try {
    const basePrompt = `
      You are master in HTML, CSS. Your task is to generate HTML and CSS separately in this format {HTML:...,CSS:....} and also while generating make sure that the website is:
      1) Responsive and good,
      2) Has good UI,
      3) Has good color combinations, gradients, and shadows,
      4) Add quotes and sentences related to the website,
      5) Make the website attractive,
      6) Add animations and transitions,
      7) Use good fonts and icons related to the website,
      Also, ensure the HTML code is more than 400 lines, and the CSS should be at least 500 lines. Be as creative as possible while following all the above instructions.
    `;
    const finalPrompt = `${req.body.prompt} \n ${basePrompt}`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are master in HTML,CSS. Your task is to generate HTML and CSS separately in this format {HTML:...,CSS:....} and also while generating make sure that the website is 1)Responsive and good, 2) has good UI, 3) has good color combinations, gradients and shadows, 4) add quotes and sentences related to the website, 5) make the website attractive, 6) add animations and transitions, 7) use good fonts and icons related to the website, 8) incorporate microinteractions related to the website, and use these three colors only 1)#6C757D 2)#2A9D8F 3)#F8EDEB and also HTML code should be more than 300 lines and css should be atleast 400 lines .Be as creative as possible while following all the 8 instructions given.",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
    });
    const responseContent = completion.choices[0].message.content;
    const htmlMatch = responseContent.match(/<html[\s\S]*<\/html>/);
    const cssMatch = responseContent.match(/```css([\s\S]*?)```/);
    const html = htmlMatch ? htmlMatch[0] : null;
    const css = cssMatch ? cssMatch[1].trim() : null;
    if (!html || !css) {
      return res.status(400).json({
        error: "Failed to extract HTML or CSS from the response.",
      });
    }
    const code = await Code.create({
      title: req.body.prompt,
      HTML: html,
      CSS: css,
    });
    // console.log(code);
    const user = await User.findById(req.body.userid);
    user.prompts.push(code._id);
    await user.save();
    // console.log(code);
    res.json(code);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateChat = async (req, res) => {
  try {
    const completion = await reprompt.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are master in HTML, CSS. Your task is to generate HTML and CSS. You will be given HTML, CSS as an object and a prompt in which the user will ask to make changes to the given code. Return the HTML and CSS separately in this format {HTML: ..., CSS: ...} and also while generating make sure that the website is responsive.",
        },
        {
          role: "user",
          content: JSON.stringify(req.body),
        },
      ],
    });
    const responseContent = completion.choices[0].message.content;
    const htmlMatch = responseContent.match(/"HTML":\s*"((?:[^"\\]|\\.)*)"/);
    const cssMatch = responseContent.match(/"CSS":\s*"((?:[^"\\]|\\.)*)"/);

    const html = htmlMatch
      ? htmlMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')
      : null;
    const css = cssMatch
      ? cssMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"')
      : null;
    const code = await Code.findByIdAndUpdate(req.params.id, {
      HTML: html,
      CSS: css,
    });
    res.json(code);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCode = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (!code) {
      return res.status(404).json({ error: "Code not found" });
    }
    res.json(code);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};