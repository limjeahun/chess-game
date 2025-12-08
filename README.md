# Next.js Chess Game (Human vs AI)

![Game Screenshot](public/screenshot.png)

## 📖 Project Overview
A modern, interactive chess application built with **Next.js** and **TypeScript**. This project features a robust "Human vs AI" gameplay experience powered by the **Stockfish** chess engine. It demonstrates complex state management, drag-and-drop interactions, and integration with WebAssembly (WASM) for high-performance computing in the browser.

## ✨ Key Features
-   **🤖 Powerful AI Opponent**: Integrated **Stockfish 17 (WASM)** via Web Workers for a responsive and challenging opponent.
-   **🎚️ Adjustable Difficulty**: Dynamic difficulty slider (Skill Level 0-20) to cater to all player levels.
-   **🖱️ Drag & Drop Gameplay**: Smooth piece movement using `react-dnd` with legal move validation.
-   **🛡️ Move Validation**: Real-time logic engine using `chess.js` to enforce all chess rules (castling, en passant, promotion).
-   **🏳️ Captured Pieces & Score**: Visual display of captured pieces and real-time material advantage score (e.g., +5).
-   **📝 Game History & Undo**: Track full move history with the ability to undo moves and retry strategies.
-   **🎨 Responsive UI**: Polished dark-themed interface built with **Tailwind CSS**, featuring move highlighting and capture indicators.

## 🛠️ Tech Stack
-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Game Logic**: [chess.js](https://github.com/jhlywa/chess.js)
-   **AI Engine**: [Stockfish.js](https://github.com/nmrugg/stockfish.js) (WebAssembly)
-   **Interaction**: [react-dnd](https://react-dnd.github.io/react-dnd/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/limjeahun/chess-game.git
    cd chess-game
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
chess-next/
├── app/                  # Next.js App Router pages
├── components/           # React UI Components (ChessBoard, Controls, etc.)
├── hooks/                # Custom Hooks (useChessGame, useStockfish)
├── public/               # Static assets and Stockfish WASM files
└── ...
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
*Built with ❤️ by Lim Jea Hun*
