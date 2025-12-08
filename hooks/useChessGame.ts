import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import { useStockfish } from './useStockfish';

export function useChessGame(options: { difficulty?: number } = {}) {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());
    const [history, setHistory] = useState<string[]>([]);
    const [status, setStatus] = useState<'playing' | 'checkmate' | 'draw'>('playing');
    const [turn, setTurn] = useState<'w' | 'b'>('w');
    const [winner, setWinner] = useState<'w' | 'b' | null>(null);
    const [capturedPieces, setCapturedPieces] = useState<{ w: string[], b: string[] }>({ w: [], b: [] });

    // 엔진 설정
    const { requestMove, bestMove, status: engineStatus, resetGame: resetEngine } = useStockfish({
        depth: 10,
        skillLevel: options.difficulty ?? 10
    });

    // 게임 상태 업데이트
    const updateGameState = useCallback((newGame: Chess) => {
        const copy = new Chess();
        if (newGame.pgn()) {
            copy.loadPgn(newGame.pgn());
        } else {
            // 빈 게임 시작 또는 문제 발생 시 대체 처리
            copy.load(newGame.fen());
        }

        setGame(copy);
        setFen(newGame.fen());
        setTurn(newGame.turn());
        setHistory(newGame.history());

        // 잡힌 기물 계산
        const historyVerbose = newGame.history({ verbose: true });
        const captured = { w: [] as string[], b: [] as string[] };

        for (const move of historyVerbose) {
            if (move.captured) {
                if (move.color === 'w') {
                    captured.w.push(move.captured); // 백이 잡음 -> 흑 기물
                } else {
                    captured.b.push(move.captured); // 흑이 잡음 -> 백 기물
                }
            }
        }
        setCapturedPieces(captured);

        if (newGame.isCheckmate()) {
            setStatus('checkmate');
            setWinner(newGame.turn() === 'w' ? 'b' : 'w');
        } else if (newGame.isDraw() || newGame.isStalemate() || newGame.isThreefoldRepetition()) {
            setStatus('draw');
        } else {
            setStatus('playing');
        }
    }, []);

    // 플레이어 이동 처리
    const makeMove = useCallback((from: string, to: string, promotion: string = 'q') => {
        try {
            const newGame = new Chess();
            if (game.pgn()) newGame.loadPgn(game.pgn());
            else newGame.load(game.fen());

            const move = newGame.move({ from, to, promotion });

            if (move) {
                updateGameState(newGame);
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }, [game, updateGameState]);

    // AI 이동 효과
    useEffect(() => {
        if (status !== 'playing' || turn === 'w') return; // 인간이 백이라고 가정

        // AI 이동 요청
        requestMove(fen);
    }, [turn, status, fen, requestMove]);

    // 엔진 최적 이동 처리
    useEffect(() => {
        if (bestMove && turn === 'b' && status === 'playing') {
            const from = bestMove.substring(0, 2);
            const to = bestMove.substring(2, 4);
            const promotion = bestMove.length > 4 ? bestMove.substring(4, 5) : 'q';

            const timer = setTimeout(() => {
                makeMove(from, to, promotion);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [bestMove, turn, status, makeMove]);

    const resetGame = useCallback(() => {
        const newGame = new Chess();
        setGame(newGame);
        updateGameState(newGame);
        setWinner(null);
        resetEngine();
    }, [updateGameState, resetEngine]);

    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const [optionSquares, setOptionSquares] = useState<string[]>([]);

    const onSquareClick = useCallback((square: string) => {
        // 같은 칸을 클릭하면 선택 해제
        if (square === selectedSquare) {
            setSelectedSquare(null);
            setOptionSquares([]);
            return;
        }

        // 현재 선택된 기물의 유효한 이동 경로인 칸을 클릭한 경우
        if (selectedSquare && optionSquares.includes(square)) {
            // 이동 실행
            makeMove(selectedSquare, square);
            setSelectedSquare(null);
            setOptionSquares([]);
            return;
        }

        // 그렇지 않으면 클릭한 칸의 기물 선택 시도
        const piece = game.get(square as any);
        // 현재 턴의 색상인 기물만 선택 가능
        if (piece && piece.color === turn) {
            setSelectedSquare(square);
            const moves = game.moves({ square: square as any, verbose: true });
            setOptionSquares(moves.map(m => m.to));
        } else {
            // 빈 칸이나 적 기물을 클릭한 경우 (이전 선택의 캡처 대상이 아님), 선택 해제
            setSelectedSquare(null);
            setOptionSquares([]);
        }
    }, [game, selectedSquare, optionSquares, turn, makeMove]);

    const undo = useCallback(() => {
        const newGame = new Chess();
        if (game.pgn()) newGame.loadPgn(game.pgn());
        else newGame.load(game.fen());

        // 히스토리가 없으면 실행 취소할 내용 없음
        if (newGame.history().length === 0) return;

        // 흑의 턴인 경우 (AI가 생각 중이거나 이동하려는 경우), 백의 이동만 취소
        if (newGame.turn() === 'b') {
            newGame.undo();
        } else {
            // 백의 턴인 경우 (AI가 이미 이동했을 가능성), AI와 백의 이동 모두 취소
            newGame.undo();
            newGame.undo();
        }

        updateGameState(newGame);
        setSelectedSquare(null);
        setOptionSquares([]);
    }, [game, updateGameState]);

    return {
        game,
        fen,
        turn,
        status,
        winner,
        history,
        engineStatus,
        makeMove,
        resetGame,
        undo,
        onSquareClick,
        selectedSquare,
        optionSquares,
        capturedPieces
    };
}
