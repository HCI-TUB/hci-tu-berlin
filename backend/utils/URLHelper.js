const buildAssetUrl = (req, assetPath) => {
  if (!assetPath) return null;

  // If already a full URL, return as-is
  if (assetPath.startsWith("http")) {
    return assetPath;
  }

  //const baseUrl = `${req.protocol}://${req.get("host")}`;

  // Ensure path starts with /
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  console.log("Processing gallery:", path);
  return `${path}`;
};

const replaceAssetUrlsInContent = (req, content) => {
  if (!content || typeof content !== "string") return content;

  // Find all paths like /images/..., /assets/..., /files/...
  return content.replace(
    /\/(images|assets|files|uploads|photoSlider)\/[^\s"')<]+/gi,
    (match) => buildAssetUrl(req, match),
  );
};

module.exports = { buildAssetUrl, replaceAssetUrlsInContent };
