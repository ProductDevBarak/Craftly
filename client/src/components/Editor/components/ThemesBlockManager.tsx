import React from "react";

const colorPalettes = [
  {
    name: "Cool Harmony",
    colors: ["#272838", "#5D536B", "#7D6B91", "#989FCE", "#347FC4"],
  },
  {
    name: "Forest Canopy",
    colors: ["#CADBC0", "#C94277", "#A27E6F", "#94524A", "#2F0A28"],
  },
  {
    name: "Golden Ember",
    colors: ["#D7FDEC", "#A9FBD7", "#B2E4DB", "#B0C6CE", "#938BA1"],
  },
];

const cssVariableMapping = {
  "--color-a": 0,
  "--color-b": 1,
  "--color-c": 2,
  "--color-d": 3,
  "--color-e": 4,
  // "--primary-color": 0,
  // "--secondary-color": 1,
  // "--accent-color": 2,
  // "--highlight-color": 3,
  // "--text-color": 4,
  "--light-bg": 0,
  "--main-bg": 1,
  "--highlight-bg": 2,
  "--light-text": 3,
  "--dark-text": 4,
  "--a": 0,
  "--b": 1,
  "--c": 2,
  "--d": 3,
  "--e": 4,
};

const ColorBars = () => {
  const updateRootVariables = (palette: { colors: string[] }) => {
    const root = document.documentElement.style;
    Object.keys(cssVariableMapping).forEach((variable) => {
      const colorIndex = cssVariableMapping[variable];
      root.setProperty(variable, palette.colors[colorIndex]);
    });
  };

  const handleClick = (index: number) => {
    const editor = (window as any).editor;
    if (!editor || !editor.CssComposer) {
      console.error("Editor or CssComposer not available.");
      return;
    }

    const cssComposer = editor.CssComposer;
    const palette = colorPalettes[index];
    const rules = cssComposer.getAll();

    rules.forEach((rule: any) => {
      const ruleStyle = rule.getStyle();
      const updatedStyles: { [key: string]: string } = {};

      Object.keys(ruleStyle).forEach((prop) => {
        if (cssVariableMapping.hasOwnProperty(prop)) {
          const colorIndex = cssVariableMapping[prop as keyof typeof cssVariableMapping];
          updatedStyles[prop] = palette.colors[colorIndex];
        } else {
          console.warn(`No mapping found for CSS variable: ${prop}`);
        }
      });

      // Update the rule's style
      rule.setStyle({ ...ruleStyle, ...updatedStyles });
    });

    // Update root variables for consistency
    updateRootVariables(palette);
  };

  return (
    <div className="p-4 space-y-4 text-white">
      {colorPalettes.map((palette, index) => (
        <div key={index} className="space-y-2">
          <div className="text-left font-inter text-sm">{palette.name}</div>
          <div
            className="relative flex cursor-pointer rounded-full overflow-hidden shadow-md h-5"
            onClick={() => handleClick(index)}
          >
            {palette.colors.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className="h-full w-1/3"
                style={{
                  backgroundColor: color,
                  clipPath:
                    colorIndex !== palette.colors.length - 1
                      ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                      : "none",
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
