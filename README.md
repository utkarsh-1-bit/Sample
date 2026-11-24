# PixelPop Mini Arcade

A lightweight mini-game collection built with React and Vite: Tic-Tac-Toe, Memory Match, and Rock Paper Scissors. The artwork is drawn with inline SVG shapes, so the app does not depend on emoji rendering or remote image assets. Decorative backgrounds are static and do not run a continuous particle animation.

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
