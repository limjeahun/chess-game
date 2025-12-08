import { useEffect, useRef, useState, useCallback } from 'react';

type EngineStatus = 'initial' | 'ready' | 'thinking' | 'idle';

export interface UseStockfishOptions {
    depth?: number;
    skillLevel?: number;
}

export function useStockfish({ depth = 10, skillLevel = 10 }: UseStockfishOptions = {}) {
    const workerRef = useRef<Worker | null>(null);
    const [status, setStatus] = useState<EngineStatus>('initial');
    const [bestMove, setBestMove] = useState<string | null>(null);
    const [evaluation, setEvaluation] = useState<string | null>(null);

    useEffect(() => {
        // 워커 초기화
        const worker = new Worker('/stockfish/stockfish.js');
        workerRef.current = worker;

        worker.onmessage = (event) => {
            const message = event.data;

            if (message === 'uciok') {
                setStatus('ready');
            } else if (message === 'readyok') {
                setStatus('idle');
            } else if (message.startsWith('bestmove')) {
                const move = message.split(' ')[1];
                setBestMove(move);
                setStatus('idle');
            } else if (message.startsWith('info') && message.includes('score')) {
                // 필요한 경우 평가 구문 분석
                // 예: info depth 10 seldepth 14 multipv 1 score cp 45 nodes 3145 nps 314500 tbhits 0 time 10 pv e2e4 e7e5
                // 지금은 원시 문자열만 저장하거나 cp/mate를 구문 분석할 수 있음
                const parts = message.split(' ');
                const scoreIndex = parts.indexOf('score');
                if (scoreIndex !== -1 && parts[scoreIndex + 1]) {
                    const type = parts[scoreIndex + 1]; // cp 또는 mate
                    const val = parts[scoreIndex + 2];
                    setEvaluation(`${type} ${val}`);
                }
            }
        };

        // 엔진 초기화
        worker.postMessage('uci');
        worker.postMessage(`setoption name Skill Level value ${skillLevel}`);

        return () => {
            worker.terminate();
        };
    }, [skillLevel]);

    const requestMove = useCallback((fen: string) => {
        if (!workerRef.current) return;
        setStatus('thinking');
        workerRef.current.postMessage(`position fen ${fen}`);
        workerRef.current.postMessage(`go depth ${depth}`);
    }, [depth]);

    const resetGame = useCallback(() => {
        if (!workerRef.current) return;
        workerRef.current.postMessage('ucinewgame');
        workerRef.current.postMessage('isready');
    }, []);

    return {
        status,
        bestMove,
        evaluation,
        requestMove,
        resetGame,
        setBestMove // 최적 이동 지우기 허용
    };
}
