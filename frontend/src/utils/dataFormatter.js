export function splitLines(content) {
  //   return content.split("\n");
  return normalizeContent(content)
    .split("\n")
    .filter((line) => line.trim() !== "");
}
const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const urlRegex = /(https?:\/\/[^\s]+)/gi;
const imageRegex = /^(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|svg))$/i;

export function parseLine(line) {
  const parts = [];
  let lastIndex = 0;

  const combinedRegex = new RegExp(
    `${emailRegex.source}|${urlRegex.source}`,
    "gi"
  );

  line.replace(combinedRegex, (match, _, index) => {
    // Text before match
    if (index > lastIndex) {
      parts.push({
        type: "text",
        value: line.slice(lastIndex, index),
      });
    }

    const imageMatch = line.match(imageRegex);
    // Email
    if (match.includes("@") && !match.startsWith("http")) {
      parts.push({
        type: "email",
        value: match,
      });
    } else if (imageMatch) {
      console.log("image matched", imageMatch[0]);
      parts.push({
        type: "image",
        value: imageMatch[0],
        alt: "Image",
      });
    }
    // URL
    else {
      parts.push({
        type: "url",
        value: match,
      });
    }

    lastIndex = index + match.length;
  });

  // Remaining text
  if (lastIndex < line.length) {
    parts.push({
      type: "text",
      value: line.slice(lastIndex),
    });
  }

  return parts.length ? parts : [{ type: "text", value: line }];
}

export function isBulletList(content) {
  const lines = splitLines(content);
  return lines.length > 2 && lines.every((line) => line.length < 120);
}

export function normalizeContent(content) {
  return content.replace(/\r\n/g, "\n");
}
