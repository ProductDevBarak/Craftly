import React, { useState } from "react";
import JSZip from "jszip";

const AutoDeployButton = ({ editor }) => {
    const [deploying, setDeploying] = useState(false);
    const [deployedUrl, setDeployedUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleDeploy = async () => {
        setDeploying(true);
        setDeployedUrl(null);
        setErrorMessage(null);

        try {
            if (!editor) throw new Error("Editor instance is not available.");
            const html = editor.getHtml();
            const css = editor.getCss();
            const zip = new JSZip();
            zip.file("index.html", html);
            if (css.trim()) {
                zip.file("styles.css", css);
            }
            const zipBlob = await zip.generateAsync({ type: "blob" });
            const formData = new FormData();
            formData.append("file", zipBlob, "project.zip");

            const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
            const siteId = process.env.Site_ID;
            const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${NETLIFY_TOKEN}`
                },
                body: formData  
            });

            if (!response.ok) throw new Error(`Netlify Error: ${response.statusText}`);
            console.log(response);

            const result = await response.json();
            if (!result.deploy_url) throw new Error("Deployment URL not found.");

            setDeployedUrl(result.url);
        } catch (error) {
            setErrorMessage(error.message || "An error occurred during deployment.");
        } finally {
            setDeploying(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
                onClick={handleDeploy}
                disabled={deploying}
                style={{
                    padding: "10px 20px",
                    backgroundColor: deploying ? "gray" : "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: deploying ? "not-allowed" : "pointer"
                }}
            >
                {deploying ? "Deploying..." : "Deploy to Netlify"}
            </button>

            {deployedUrl && (
                <p>
                    ✅ Site Deployed: <a href={deployedUrl} target="_blank" rel="noopener noreferrer">{deployedUrl}</a>
                </p>
            )}

            {errorMessage && <p style={{ color: "red" }}>❌ {errorMessage}</p>}
        </div>
    );
};

export default AutoDeployButton;
