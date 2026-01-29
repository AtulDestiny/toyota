import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination paths
const sourcePath = path.join(
  __dirname,
  "../src/components/COMPONENTS_DOCUMENTATION.md"
);
const destPath = path.join(__dirname, "../public/COMPONENTS_DOCUMENTATION.md");

// Copy the file
fs.copyFileSync(sourcePath, destPath);

console.log("Documentation file copied to public folder");
