import React, { useMemo } from 'react';
import { Chess } from 'chess.js';
import { ChessSquare } from './ChessSquare';

interface ChessBoardProps {
    game: Chess;
    onMove: (from: string, to: string) => void;
    orientation?: 'w' | 'b';
    selectedSquare?: string | null;
    optionSquares?: string[];
    onSquareClick?: (square: string) => void;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
    game,
    onMove,
    orientation = 'w',
    selectedSquare,
    optionSquares,
    onSquareClick
}) => {
    return (
        <div className="w-full max-w-[720px] aspect-square grid grid-cols-8 grid-rows-8 border-4 md:border-8 border-amber-900 shadow-2xl select-none">
            {renderBoard({ game, onMove, orientation, selectedSquare, optionSquares, onSquareClick })}
        </div>
    );
};

// 더 깔끔한 렌더링을 위한 도우미
function renderBoard({ game, onMove, orientation, selectedSquare, optionSquares, onSquareClick }: ChessBoardProps) {
    const board = game.board(); // 8x8, 행 0은 랭크 8

    // 정사각형의 평면 목록 생성
    const squares = [];

    // 방향이 백이면 랭크 8 -> 1 (인덱스 0 -> 7)로 렌더링합니다
    // 방향이 흑이면 랭크 1 -> 8 (인덱스 7 -> 0)로 렌더링합니다
    // 그리고 파일도 뒤집어야 합니까?
    // 보통 "흑색 뷰"는 보드를 분할하여 H8이 왼쪽 하단인가요? 아니요, H1입니다.
    // 표준 백색 뷰: a8 (왼쪽 상단).
    // 표준 흑색 뷰: h1 (왼쪽 상단).

    const rows = orientation === 'w' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    const cols = orientation === 'w' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];

    for (let r of rows) {
        for (let c of cols) {
            // game.board()는 항상 백의 관점입니다 (랭크 8이 0)
            const piece = board[r][c];

            // 정사각형 색상 결정
            // 표준: 합계가 짝수이면 흰색? 아니요.
            // a8 (0,0) -> 흰색 정사각형.
            // 0+0 = 0 (짝수). 그래서 짝수는 흰색?
            // a1 (7,0) -> 7+0=7 (홀수) -> 검은색 정사각형.
            // 잠깐, 체스판 a1은 검은색입니다. a8은 흰색입니다.
            // 따라서 (r+c)가 짝수이면 -> 흰색?
            // 확인해 봅시다. a8: 밝음. a1: 어두움.
            // 0,0 (a8) 짝수 -> 밝음. 맞음.
            // 7,0 (a1) 홀수 -> 어두움. 맞음.

            const isDark = (r + c) % 2 === 1;

            // 대수적 위치 계산
            // r=0 -> 8, r=7 -> 1.
            const file = 'abcdefgh'[c];
            const rank = 8 - r;
            const position = `${file}${rank}`;

            squares.push(
                <ChessSquare
                    key={position}
                    position={position}
                    piece={piece}
                    isBlack={isDark}
                    onDrop={onMove}
                    onClick={() => onSquareClick?.(position)}
                    isSelected={position === selectedSquare}
                    isOption={optionSquares?.includes(position)}
                />
            );
        }
    }
    return squares;
}
