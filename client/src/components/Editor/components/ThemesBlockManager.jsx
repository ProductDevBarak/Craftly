import React from "react";

const colorPalettes = [
    {
      name: "Cool Harmony",
      colors: ["#6C757D", "#2A9D8F", "#F8EDEB"],
    },
    {
      name: "Forest Canopy",
      colors: ["#2A6041", "#A2D9B1", "#F2F7F0"],
    },
    {
      name: "Golden Ember",
      colors: ["#D35400", "#F39C12", "#F5E9D7"],
    },
];

const ColorBars = () => {
    const handleClick = (index, colors) => {
      console.log(`Palette index clicked: ${index}`);
      console.log(`Colors of the palette: ${colors.join(", ")}`);
    };
  
    return (
        <div className="p-4 space-y-4 text-white">
          {colorPalettes.map((palette, index) => (
            <div key={index} className="space-y-2">
              <div className="text-left font-inter text-sm">{palette.name}</div>
              <div
                className="relative flex cursor-pointer rounded-full overflow-hidden shadow-md h-5"
                onClick={() => handleClick(index, palette.colors)}
              >
                {palette.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="h-full w-1/3"
                    style={{ 
                      backgroundColor: color,
                      clipPath: colorIndex !== palette.colors.length - 1 ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" : "none"
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    };
    
export default ColorBars;
/*
    Strictly Ensure the HTML code is more than 200 lines, and the CSS should be at least 400 lines. Be as creative as possible while following all the above instructions.
colors: ["#6C757D", "#2A9D8F", "#F8EDEB"],
Welcome to [Your Club Name] – Empowering Coders of Tomorrow!

Welcome to CodeSphere Club – Unlocking the Power of Code!

At CodeSphere Club, we believe coding is more than just writing lines of code—it's a tool for innovation, problem-solving, and shaping the future. Whether you’re a beginner taking your first steps into the world of programming or an experienced coder looking to expand your skills, our club is the perfect space for you.

Who We Are
CodeSphere Club is a community of passionate learners, tech enthusiasts, and developers dedicated to exploring the limitless possibilities of coding. Our mission is to create a vibrant ecosystem where creativity, collaboration, and curiosity thrive.

What We Do
From hands-on workshops to hackathons, we offer a wide range of activities tailored to all skill levels:

Weekly Workshops: Learn the latest programming languages, frameworks, and tools through interactive sessions.
Hackathons: Collaborate with like-minded individuals to solve real-world challenges.
Project Showcases: Share your work, get feedback, and inspire others with your creativity.
Mentorship Programs: Gain guidance from industry professionals and experienced peers.
Networking Events: Connect with tech leaders, startups, and fellow developers to expand your horizons.
Why Join Us?
At CodeSphere, you’ll gain hands-on experience, build a strong portfolio, and become part of a supportive community. Whether you want to create impactful projects, advance your career, or just have fun coding, our club is the perfect place to achieve your goals.

Get Involved
Ready to start your coding journey? Join CodeSphere Club today and be part of a community that empowers you to dream, build, and innovate.

Let’s code the future together!
 You are master in HTML, CSS. Your task is to generate HTML and CSS separately in this format {HTML:...,CSS:....} and also while generating make sure that the website is:
      1) Responsive and good,
      2) Has good UI,
      3) Has good color combinations, gradients, and shadows,
      4) Add quotes and sentences related to the website,
      5) Make the website attractive,
      6) Add animations and transitions,
      7) Use good fonts and icons related to the website,
*/