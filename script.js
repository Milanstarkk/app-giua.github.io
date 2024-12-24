const repoOwner = "Milanstarkk";
const repoName = "Giua-App";  

async function fetchLatestRelease() {
    try {
        
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

        // Effettua la richiesta all'API
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Errore: ${response.status}`);

        const releaseData = await response.json();

   
        const latestVersion = releaseData.tag_name || releaseData.name;
        const apkAsset = releaseData.assets.find(asset => asset.name.endsWith(".apk"));

    
        document.getElementById("latest-version").textContent = `Latest version: ${latestVersion}`;

        
        if (apkAsset) {
            const downloadButton = document.getElementById("download-button");
            downloadButton.disabled = false;
            downloadButton.onclick = () => window.open(apkAsset.browser_download_url, "_blank");
        } else {
            document.getElementById("download-button").textContent = "Non disponibile";
        }
    } catch (error) {
        console.error("Errore durante il recupero della release:", error);
        document.getElementById("latest-version").textContent = "Error fetching latest version.";
    }
}

fetchLatestRelease();
