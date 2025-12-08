# Next.js 체스 게임 (Human vs AI)

![게임 스크린샷](public/screenshot.png)

## 📖 프로젝트 개요
**Next.js**와 **TypeScript**로 제작된 현대적이고 인터랙티브한 체스 애플리케이션입니다. 이 프로젝트는 **Stockfish** 체스 엔진을 활용한 강력한 "인간 vs 인공지능" 게임플레이 경험을 제공합니다. 복잡한 상태 관리, 드래그 앤 드롭 상호작용, 그리고 브라우저 내 고성능 연산을 위한 WebAssembly (WASM) 통합을 데모합니다.

## ✨ 주요 기능
-   **🤖 강력한 AI 상대**: Web Workers를 통해 통합된 **Stockfish 17 (WASM)**로 반응성 뛰어나고 도전적인 상대를 제공합니다.
-   **🎚️ 난이도 조절**: 모든 실력의 플레이어에 맞춘 동적 난이도 슬라이더 (스킬 레벨 0-20).
-   **🖱️ 드래그 앤 드롭 플레이**: `react-dnd`를 사용한 부드러운 기물 이동과 합법적인 수 검증.
-   **🛡️ 이동 검증**: `chess.js`를 사용한 실시간 로직 엔진으로 모든 체스 규칙(캐슬링, 앙파상, 프로모션)을 적용.
-   **🏳️ 잡은 기물 & 점수**: 잡은 기물을 시각적으로 표시하고 실시간 기물 점수 우위(예: +5)를 보여줍니다.
-   **📝 게임 기록 & 실행 취소**: 전체 이동 기록을 추적하며 무르기(Undo) 기능을 통해 전략을 다시 시도할 수 있습니다.
-   **🎨 반응형 UI**: **Tailwind CSS**로 구축된 세련된 다크 테마 인터페이스, 이동 강조 및 포획 표시 기능 포함.

## 🛠️ 기술 스택
-   **프레임워크**: [Next.js 14](https://nextjs.org/) (App Router)
-   **언어**: [TypeScript](https://www.typescriptlang.org/)
-   **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
-   **게임 로직**: [chess.js](https://github.com/jhlywa/chess.js)
-   **AI 엔진**: [Stockfish.js](https://github.com/nmrugg/stockfish.js) (WebAssembly)
-   **상호작용**: [react-dnd](https://react-dnd.github.io/react-dnd/)

## 🚀 시작하기

### 필수 요구사항
- Node.js (v18 이상)
- npm 또는 yarn

### 설치 방법
1.  저장소 복제:
    ```bash
    git clone https://github.com/limjeahun/chess-game.git
    cd chess-game
    ```

2.  의존성 설치:
    ```bash
    npm install
    ```

3.  개발 서버 실행:
    ```bash
    npm run dev
    ```

4.  브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 📁 프로젝트 구조
```
chess-next/
├── app/                  # Next.js App Router 페이지
├── components/           # React UI 컴포넌트 (ChessBoard, Controls 등)
├── hooks/                # 커스텀 훅 (useChessGame, useStockfish)
├── public/               # 정적 에셋 및 Stockfish WASM 파일
└── ...
```

## 🤝 기여하기
기여는 언제나 환영합니다! 편하게 Pull Request를 제출해 주세요.

---
*Built with ❤️ by Lim Jea Hun*
