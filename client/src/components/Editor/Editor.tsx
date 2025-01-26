import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import { updateChat, getCode } from "../../utils/code.js";
import { useParams } from "react-router-dom";

const Editor = () => {
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [editor, setEditor] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [defaultHtml, setDefaultHtml] = useState("");
  const [defaultCss, setDefaultCss] = useState("");
  const id = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      const code = await getCode(id);
      setDefaultHtml(code.HTML);
      setDefaultCss(code.CSS);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!pluginLoaded) {
      setPluginLoaded(true);
    } else if (!editor) {
      const e = grapesjs.init({
        color: "white",
        height: "95vh",
        fromElement: true,
        storageManager: {
          type: "remote",
          urlStore:
            "http://173.249.14.149:3001/api/Dashboards/5ef370de14213070188a41eb/grapes?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ",
          urlLoad:
            "http://173.249.14.149:3001/api/Dashboards/5ef370de14213070188a41eb/grapes?access_token=B6IES26pZSvpX4J8c8q4wmseASpRtmBOtvXzztH57NDDJXxO94qE7VbtJ7y718GZ",
          autosave: false,
          autoload: true,
          contentTypeJson: true,
          storeComponents: true,
          allowScripts: 1,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
        },
      });
      setEditor(e);
    }
  }, [pluginLoaded, editor]);

  useEffect(() => {
    if (editor) {
      editor.setComponents(defaultHtml);
      editor.setStyle(defaultCss);
    }
  }, [defaultHtml, defaultCss, editor]);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setPrompt(e.target.value);
      const code = { HTML: editor.getHtml(), CSS: editor.getCss() };
      const response = await updateChat(code, prompt, id);
      console.log(response);
      editor.setComponents();
      editor.setStyle(response.CSS);
      setPrompt("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div id="g" className="flex-1" />
      <div className="p-2 border-b border-gray-300 bg-gray-50 w-full">
        <label htmlFor="promptInput" className="text-sm font-bold">
          Enter Prompt:
        </label>
        <input
          type="text"
          id="promptInput"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 mt-1 rounded-md border border-gray-300"
        />
      </div>
    </div>
  );
};

export default Editor;

// import * as React from "react";
// import GjsEditor, {
//   AssetsProvider,
//   Canvas,
//   ModalProvider,
// } from "@grapesjs/react";
// import type { Editor, EditorConfig } from "grapesjs";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CustomModal from "./components/CustomModal.tsx";
// import CustomAssetManager from "./components/CustomAssetManager.tsx";
// import Topbar from "./components/Topbar.tsx";
// import RightSidebar from "./components/RightSidebar.tsx";
// import "./style.css";

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

// const gjsOptions: EditorConfig = {
//   height: "calc(100vh - 40px)",
//   storageManager: false,
//   undoManager: { trackSelection: false },
//   selectorManager: { componentFirst: true },
//   projectData: {
//     assets: [],
//     pages: [
//       {
//         name: "Home page",
//         component: `
//           <div class="custom-container">
//             <h1>My Custom HTML</h1>
//             <p>This is a paragraph in my custom HTML.</p>
//           </div>
//         `,
//       },
//     ],
//   },
// };

// export default function App() {
//   const onEditor = (editor: Editor) => {
//     (window as any).editor = editor;

//     editor.on("load", () => {
//       editor.setStyle(`
//         .custom-container {
//           background-color: #333;
//           color: #fff;
//           padding: 20px;
//         }
//       `);
//     });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <GjsEditor
//         className="gjs-custom-editor text-white"
//         grapesjs="https://unpkg.com/grapesjs"
//         // grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
//         options={gjsOptions}
//         plugins={[
//           {
//             id: "gjs-blocks-basic",
//             src: "https://unpkg.com/grapesjs-blocks-basic",
//           },
//         ]}
//         onEditor={onEditor}
//       >
//         <div className={`flex flex-col h-full`}>
//           <Topbar className="h-[40px] bg-neutral-800" />
//           <div className="gjs-column-m flex flex-grow bg-black border-t border-white font-sans">
//             <Canvas className="h-full gjs-custom-editor-canvas border-r" />
//             <RightSidebar />
//           </div>
//         </div>
//         <ModalProvider>
//           {({ open, title, content, close }) => (
//             <CustomModal
//               open={open}
//               title={title}
//               children={content}
//               close={close}
//             />
//           )}
//         </ModalProvider>
//         <AssetsProvider>
//           {({ assets, select, close, Container }) => (
//             <Container>
//               <CustomAssetManager
//                 assets={assets}
//                 select={select}
//                 close={close}
//               />
//             </Container>
//           )}
//         </AssetsProvider>
//       </GjsEditor>
//     </ThemeProvider>
//   );
// }
