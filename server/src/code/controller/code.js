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
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are master in HTML,CSS. Your task is to generate HTML and CSS separately in this format {HTML:...,CSS:....} and also while generating make sure that the website is responsive",
        },
        {
          role: "user",
          content: req.body.prompt,
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
      title: req.body.propmt,
      HTML: html,
      CSS: css,
    });
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
    console.log(responseContent);
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
