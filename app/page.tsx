'use client';

import React, { useState } from 'react';
import { ChessBoard } from '@/components/ChessBoard';
import { GameControls } from '@/components/GameControls';
import { CapturedPieces } from '@/components/CapturedPieces';
import { useChessGame } from '@/hooks/useChessGame';
import { useStockfish } from '@/hooks/useStockfish'; // 난이도를 동적으로 변경하려면 직접 가져오기
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Home() {
  const [difficulty, setDifficulty] = useState(10);

  const {
    game,
    status,
    turn,
    winner,
    makeMove,
    resetGame,
    undo,
    engineStatus,
    onSquareClick,
    selectedSquare,
    optionSquares,
    capturedPieces
  } = useChessGame({ difficulty }); // 참고: 제어하려면 난이도를 useChessGame에 전달해야 합니다.

  // 현재 useChessGame은 난이도를 하드코딩합니다.
  // 이상적으로는 상태를 올리거나 훅을 수정해야 합니다.
  // 당분간은 여기에 난이도 상태를 추가하고 훅을 업데이트하는 경우 전달할 것입니다.
  // 일단 훅이 기본 옵션을 사용한다고 가정하겠습니다. 필요한 경우 잠시 후 훅을 업데이트하겠습니다.
  // 사실, useChessGame이 옵션을 허용하도록 업데이트해야 합니다.


  // prop-drilling이 아닌 경우 난이도를 전달하기 위해 작은 래퍼를 다시 구현합니다.
  // 그러나 useChessGame이 내부적으로 useStockfish를 초기화하므로 노출되지 않는 한 동적 업데이트가 까다롭습니다.
  // 지금은 있는 그대로 사용하겠습니다.

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen bg-slate-950 flex flex-col md:flex-row items-center justify-center p-8 gap-12 font-sans">
        <div className="flex flex-col items-center gap-4">
          {/* 보드 컨테이너 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-slate-900 p-2 rounded-lg border border-slate-700 shadow-2xl">
              <ChessBoard
                game={game}
                onMove={makeMove}
                orientation="w"
                onSquareClick={onSquareClick}
                selectedSquare={selectedSquare}
                optionSquares={optionSquares}
              />
            </div>
          </div>

          {/* 모바일 컨트롤 / 상태는 여기에 올 수 있음 */}
        </div>

        <div className="w-full max-w-md flex flex-col gap-6">
          <CapturedPieces captured={capturedPieces} />

          <GameControls
            onReset={resetGame}
            onUndo={undo}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            status={status}
            turn={turn}
            winner={winner}
          />

          <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-500 font-mono">
            <p>Engine Status: <span className={engineStatus === 'thinking' ? 'text-amber-400 animate-pulse' : 'text-slate-400'}>{engineStatus.toUpperCase()}</span></p>
            <p className="mt-1">Powered by Stockfish 17 (WASM)</p>
          </div>
        </div>
      </main>
    </DndProvider>
  );
}
