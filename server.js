import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("./dist", import.meta.url)));
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  try {
    const pathname = new URL(request.url, "http://localhost").pathname;
    const relativePath = decodeURIComponent(pathname).replace(/^\/+/, "");
    let filePath = resolve(root, relativePath);
    if (filePath !== root && !filePath.startsWith(root + sep)) {
      response.writeHead(400);
      response.end("Bad request");
      return;
    }

    let content;
    try {
      content = await readFile(filePath);
    } catch (error) {
      if (error.code !== "ENOENT" && error.code !== "EISDIR") throw error;
      filePath = resolve(root, "index.html");
      content = await readFile(filePath);
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch (error) {
    console.error("Failed to serve request:", error);
    response.writeHead(500);
    response.end("Internal server error");
  }
});

const port = Number(process.env.PORT || 8080);
server.listen(port, "0.0.0.0", () => {
  console.log(`Tic-Tac-Toe is listening on port ${port}`);
});
