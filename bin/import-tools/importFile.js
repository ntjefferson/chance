const fs = require("fs");

const importFile = file => {
    try {
      let content = fs.readFileSync(`../temp/${file}`, "utf8");
      content = JSON.parse(content)
      // Check if content is empty
      if(!Array.isArray(content) || !content.length) {
        console.log(`The file ${file} appears to be empty`)
      } else {
        return content
      }
    } catch (err) {
      // Error means the file doesn't exist
      if (err.code === "ENOENT") {
        console.log(`We could not find file ${file}`);
      } else {
        throw err;
      }
    }
  };

  module.exports = importFile;

