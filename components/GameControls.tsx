import React from 'react';

interface GameControlsProps {
    onReset: () => void;
    onUndo?: () => void;
    difficulty: number;
    onDifficultyChange: (level: number) => void;
    status: string;
    turn: string;
    winner: string | null;
}

export const GameControls: React.FC<GameControlsProps> = ({
    onReset,
    onUndo,
    difficulty,
    onDifficultyChange,
    status,
    turn,
    winner
}) => {
    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-800 rounded-xl shadow-lg w-full max-w-md text-slate-100">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    체스 게임
                </h2>
                <p className="text-slate-400">인간 vs AI</p>
            </div>

            <div className="space-y-4">
                {/* 상태 표시 */}
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm uppercase tracking-wider">상태</span>
                        <span className={`font-bold ${status === 'checkmate' ? 'text-red-400' : 'text-emerald-400'}`}>
                            {status === 'checkmate' ? '체크메이트!' : status === 'check' ? '체크!' : '게임 중'}
                        </span>
                    </div>
                    {winner && (
                        <div className="text-center font-bold text-xl text-yellow-400 animate-pulse">
                            {winner === 'w' ? '백' : '흑'} 승리!
                        </div>
                    )}
                    {!winner && (
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${turn === 'w' ? 'bg-white' : 'bg-black border border-white'}`}></div>
                            <span>{turn === 'w' ? "백 차례" : "흑 차례 (AI)"}</span>
                        </div>
                    )}
                </div>

                {/* 난이도 슬라이더 */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        AI 난이도 (숙련도: {difficulty})
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={difficulty}
                        onChange={(e) => onDifficultyChange(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>쉬움 (0)</span>
                        <span>그랜드마스터 (20)</span>
                    </div>
                </div>

                {/* 작업 */}
                <div className="flex gap-4">
                    <button
                        onClick={onReset}
                        className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                        새 게임
                    </button>
                    <button
                        onClick={onUndo}
                        className="flex-1 py-3 px-4 bg-slate-600 hover:bg-slate-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                        되돌리기
                    </button>
                </div>
            </div>
        </div>
    );
};
