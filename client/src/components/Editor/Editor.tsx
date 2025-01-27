import * as React from "react";
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from "@grapesjs/react";
import type { Editor, EditorConfig } from "grapesjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomModal from "./components/CustomModal.tsx";
import CustomAssetManager from "./components/CustomAssetManager.tsx";
import Topbar from "./components/Topbar.tsx";
import RightSidebar from "./components/RightSidebar.tsx";
import "./style.css";
import { getCode } from "../../utils/code";
import { useParams } from "react-router-dom";
import GradientBars from "./components/Themes.jsx";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const { id } = useParams();
  const [defaultHTML, setDefaultHTML] = React.useState<string>("");
  const [defaultCSS, setDefaultCSS] = React.useState<string>("");
  const [editorInstance, setEditorInstance] = React.useState<Editor | null>(
    null
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const code = await getCode(id);
        setDefaultHTML(code.HTML);
        setDefaultCSS(code.CSS);

        if (editorInstance) {
          editorInstance.setComponents(code.HTML);
          editorInstance.setStyle(code.CSS);
        }
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
    fetchData();
  }, [id, editorInstance]);

  const gjsOptions: EditorConfig = {
    height: "calc(100vh - 40px)",
    storageManager: false,
    undoManager: { trackSelection: false },
    selectorManager: { componentFirst: true },
    projectData: {
      assets: [],
      pages: [
        {
          name: "Page",
          component: defaultHTML,
        },
      ],
    },
  };

  const onEditor = (editor: Editor) => {
    setEditorInstance(editor);
    (window as any).editor = editor;

    editor.on("load", () => {
      if (defaultCSS) {
        editor.setStyle(defaultCSS);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <GjsEditor
        className="gjs-custom-editor text-white"
        grapesjs="https://unpkg.com/grapesjs"
        options={gjsOptions}
        plugins={[
          {
            id: "gjs-blocks-basic",
            src: "https://unpkg.com/grapesjs-blocks-basic",
          },
        ]}
        onEditor={onEditor}
      >
        <div className={`flex flex-col h-full`}>
          <Topbar className="h-[40px] bg-neutral-800" />
          <div className="gjs-column-m flex flex-grow bg-black border-t border-white font-sans">
            <Canvas className="h-full gjs-custom-editor-canvas border-r" />
            <GradientBars/>
          </div>
        </div>
        <ModalProvider>
          {({ open, title, content, close }) => (
            <CustomModal
              open={open}
              title={title}
              children={content}
              close={close}
            />
          )}
        </ModalProvider>
        <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager
                assets={assets}
                select={select}
                close={close}
              />
            </Container>
          )}
        </AssetsProvider>
      </GjsEditor>
    </ThemeProvider>
  );
}
