import fs from "fs";
const log = fs.readFileSync("test-output.log", "utf16le");
console.log(log);
