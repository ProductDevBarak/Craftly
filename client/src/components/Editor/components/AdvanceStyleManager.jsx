import React from "react";
import CustomAccordion from "./CustomAccordion.jsx";
import StylePropertyField from "./StylePropertyField.tsx";

function AdvanceStyleManager({ sectors }) {
  const advanceSectors = [
    { name: "Box Editor", attributes: [] },
    { name: "Transition & Transformation", attributes: [] },
  ];
  sectors.forEach((sector) => {
    sector.getProperties().forEach((p) => {
      if (p.id === "margin" || p.id === "padding" || p.id === "box-shadow") {
        advanceSectors[0].attributes.push({ id: p.getId(), prop: p });
      }
      if (p.id === "transition" || p.id === "transform") {
        advanceSectors[1].attributes.push({ id: p.getId(), prop: p });
      }
    });
  });

  return (
    <div className="text-white">
      {advanceSectors.map((sector) => {
        if (sector.attributes.length === 0) return null;
        return (
          <CustomAccordion
            key={sector.name}
            title={sector.name}
            className=""
            size="md"
          >
            <div className="flex flex-wrap">
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

export default AdvanceStyleManager;

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
