const fs = require("fs");

// path needed to create absolute path for export
const path = require("path");

const importFile = file => {
  try {
    let content = fs.readFileSync(
      path.resolve(__dirname, `../../temp/${file}`),
      "utf8"
    );
    content = JSON.parse(content);
    // Check if content is empty
    if (!Array.isArray(content) || !content.length) {
      return `ERROR: The file appears to be empty`
    } else {
      return content;
    }
  } catch (err) {
    // Error means the file doesn't exist
    if (err.code === "ENOENT") {
      return `ERROR: We could not find file`
    } else {
      return `ERROR: ${err}`;
    }
  }
};

module.exports = importFile;
