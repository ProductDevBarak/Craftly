import * as React from "react";
import { SelectorsResultProps } from "@grapesjs/react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function CustomSelectorManager({
  selectedState,
  states,
  setState,
}: Omit<SelectorsResultProps, "Container">) {
  return (
    <div className="gjs-custom-selector-manager p-2 flex flex-col gap-2 text-left">
      <div className="flex items-center justify-between px-2">
        <div>Select the state</div>
        <FormControl size="small">
          <Select
            value={selectedState}
            onChange={(ev) => setState(ev.target.value)}
            displayEmpty
          >
            <MenuItem value="">Normal</MenuItem>
            {states.map((state) => {
              if (state.id === "active" || state.id === "hover")
                return (
                  <MenuItem value={state.id} key={state.id}>
                    {capitalize(state.getName())}
                  </MenuItem>
                );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
