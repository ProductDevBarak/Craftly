import React from "react";
import CustomAccordion from "./CustomAccordion.jsx";
import StylePropertyField from "./StylePropertyField.tsx";

function BasicStyleManager({ sectors }) {
  const basicSectors = [
    { name: "Dimensions & Layout", attributes: [] },
    { name: "Text Editor", attributes: [] },
    { name: "Appearance", attributes: [] },
    { name: "Border", attributes: [] },
    { name: "Background", attributes: [] },
  ];
  sectors.forEach((sector) => {
    sector.getProperties().forEach((p) => {
      if (
        p.id === "width" ||
        p.id === "height" ||
        p.id === "display" ||
        p.id === "position" ||
        p.id === "top" ||
        p.id === "bottom" ||
        p.id === "left" ||
        p.id === "right"
      ) {
        basicSectors[0].attributes.push({ id: p.getId(), prop: p });
      }
      if (
        p.id === "font-family" ||
        p.id === "font-size" ||
        p.id === "font-weight" ||
        p.id === "color" ||
        p.id === "line-height" ||
        p.id === "text-align" ||
        p.id === "text-shadow"
      ) {
        basicSectors[1].attributes.push({ id: p.getId(), prop: p });
      }
      if (p.id === "opacity") {
        basicSectors[2].attributes.push({ id: p.getId(), prop: p });
      }
      if (p.id === "border" || p.id === "border-radius") {
        basicSectors[3].attributes.push({ id: p.getId(), prop: p });
      }
      if (p.id === "background") {
        basicSectors[4].attributes.push({ id: p.getId(), prop: p });
      }
    });
  });

  return (
    <div className="text-white">
      {basicSectors.map((sector) => {
        if (sector.attributes.length === 0) return null;
        return (
          <CustomAccordion
            key={sector.name}
            title={sector.name}
            className=""
            size="sm"
            colour= "gray-300"
            svg="Gray"
            font="inter"
            border="no"
          >
            <div className="flex flex-wrap p-4">
              {sector.attributes.map((prop) => (
                <StylePropertyField key={prop.id} prop={prop.prop} />
              ))}
            </div>
          </CustomAccordion>
        );
      })}
    </div>
  );
}

export default BasicStyleManager;

{
  /* {sectors.map((sector) => (
        <CustomAccordion
          key={sector.getId()}
          title={sector.getName()}
          className=""
        >
          <div className="flex flex-wrap">
            {sector.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        </CustomAccordion>
      ))} */
}
