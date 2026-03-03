const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

/*
   Route: /download-work-order.pdf
   Direct PDF response.
*/
app.get("/download-work-order.pdf", (req, res) => {
    const filePath = path.join(__dirname, "work-order.pdf");
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Length": stat.size,
        "Content-Disposition": 'inline; filename="download-work-order.pdf"',
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
