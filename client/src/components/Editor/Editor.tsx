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

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const { id } = useParams();
  const [defaultHTML, setDefaultHTML] = React.useState<string>("");
  const [defaultCSS, setDefaultCSS] = React.useState<string>("");
  const [editorInstance, setEditorInstance] = React.useState<Editor | null>(null);
  const [loading, setLoading] = React.useState(true); // Added loading state

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
      } finally {
        setLoading(false); // Stop loading after fetching data
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GjsEditor
        className="gjs-custom-editor text-white"
        grapesjs="https://unpkg.com/grapesjs"
        options={gjsOptions}
        plugins={[
          {
            id: "gjs-blocks-basic",
            src: "https://unpkg.com/grapesjs-blocks-basic"
          },
          {
            id: "grapesjs-plugin-forms",
            src: "https://unpkg.com/grapesjs-plugin-forms"
          },
          {
            id: "grapesjs-navbar",
            src: "https://unpkg.com/grapesjs-navbar"
          },
          {
            id: "grapesjs-component-countdown",
            src: "https://unpkg.com/grapesjs-component-countdown"
          },
          {
            id: "grapesjs-style-gradient",
            src: "https://unpkg.com/grapesjs-style-gradient"
          },
          {
            id: "grapesjs-style-filter",
            src: "https://unpkg.com/grapesjs-style-filter"
          },
          {
            id: "grapesjs-tooltip",
            src: "https://unpkg.com/grapesjs-tooltip"
          },
          {
            id: "grapesjs-custom-code"
            , src: "https://unpkg.com/grapesjs-custom-code"
          },
          {
            id: "grapesjs-user-blocks",
            src: "https://unpkg.com/grapesjs-user-blocks"
          },
          {
            id: "grapesjs-calendar-component",
            src: "https://unpkg.com/grapesjs-calendar-component"
          },
        ]}
        onEditor={onEditor}
      >
        <div className={`flex flex-col h-full`}>
          <Topbar className="h-[40px] bg-neutral-800" />
          <div className="gjs-column-m flex flex-grow bg-black border-t border-white font-sans">
            <Canvas className="h-full gjs-custom-editor-canvas border-r" />
            <RightSidebar />
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