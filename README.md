# Tic-Tac-Toe

A responsive, two-player Tic-Tac-Toe game built with React and Vite.

## Run locally

```sh
npm install
npm run dev
```

## Run with Docker

```sh
docker build -t tic-tac-toe .
docker run --rm -p 8080:8080 tic-tac-toe
```

Open `http://localhost:8080`. The container listens on `PORT` (default `8080`), so set that environment variable if your hosting provider assigns a different port.
