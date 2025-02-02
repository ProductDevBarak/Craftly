import React, { useState, useEffect } from "react";
import JSZip from "jszip";

const AutoDeployButton = ({ editor }) => {
    const [deploying, setDeploying] = useState(false);
    const [deployId, setDeployId] = useState(null);
    const [deployStatus, setDeployStatus] = useState(null);
    const [deployedUrl, setDeployedUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const NETLIFY_TOKEN = process.env.REACT_APP_NETLIFY_TOKEN;
    const siteId = process.env.REACT_APP_SITE_ID;

    const handleDeploy = async () => {
        setDeploying(true);
        setDeployedUrl(null);
        setErrorMessage(null);
        setDeployStatus("Uploading...");

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

            const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${NETLIFY_TOKEN}`
                },
                body: formData  
            });

            if (!response.ok) throw new Error(`Netlify Error: ${response.statusText}`);
            const result = await response.json();

            if (!result.id) throw new Error("Deployment ID not found.");
            setDeployId(result.id);

            setDeployStatus("Processing...");
        } catch (error) {
            setErrorMessage(error.message || "An error occurred during deployment.");
            setDeploying(false);
        }
    };

    useEffect(() => {
        if (deployId) {
            const interval = setInterval(async () => {
                try {
                    const response = await fetch(`https://api.netlify.com/api/v1/deploys/${deployId}`, {
                        headers: {
                            "Authorization": `Bearer ${NETLIFY_TOKEN}`
                        }
                    });

                    if (!response.ok) throw new Error(`Failed to fetch deployment status.`);
                    const result = await response.json();

                    if (result.state === "ready") {
                        setDeployStatus("✅ Deployment Complete!");
                        setDeployedUrl(result.url);
                        clearInterval(interval);
                        setDeploying(false);
                    } else if (result.state === "error") {
                        setDeployStatus("❌ Deployment Failed.");
                        setErrorMessage("Deployment failed. Check Netlify logs.");
                        clearInterval(interval);
                        setDeploying(false);
                    } else {
                        setDeployStatus(`🚀 Status: ${result.state}`);
                    }
                } catch (error) {
                    console.error(error);
                    setDeployStatus("⚠️ Error Fetching Status");
                    clearInterval(interval);
                    setDeploying(false);
                }
            }, 5000); // Check status every 5 seconds

            return () => clearInterval(interval);
        }
    }, [deployId]);

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

            {deployStatus && <p>{deployStatus}</p>}

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