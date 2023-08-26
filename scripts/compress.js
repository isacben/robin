const fs = require("fs");
const archiver = require("archiver");

const distDir = process.cwd() + "/dist";
const output = fs.createWriteStream("game.zip");
const archive = archiver("zip", { zlib: { level: 9 } });

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.pipe(output);
archive.directory(distDir, false);

archive.finalize();