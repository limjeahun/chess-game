import React from 'react';
import { ChessPiece } from './ChessPiece';

interface CapturedPiecesProps {
    captured: {
        w: string[];
        b: string[];
    };
    orientation?: 'w' | 'b';
}

export const CapturedPieces: React.FC<CapturedPiecesProps> = ({ captured, orientation = 'w' }) => {
    // 백이 잡은 것 -> 흑 기물 (captured.w)
    // 흑이 잡은 것 -> 백 기물 (captured.b)

    // 점수 계산 (선택 사항)
    const getScore = (pieces: string[]) => {
        const values: { [key: string]: number } = { p: 1, n: 3, b: 3, r: 5, q: 9 };
        return pieces.reduce((acc, p) => acc + (values[p] || 0), 0);
    };

    const whiteScore = getScore(captured.w);
    const blackScore = getScore(captured.b);

    return (
        <div className="flex flex-col gap-2 w-full max-w-md">
            {/* Top Player (Black in default 'w' orientation) */}
            <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded border border-slate-800 h-12">
                <div className="flex -space-x-2">
                    {captured.b.map((p, i) => (
                        <div key={i} className="w-6 h-6 transform scale-75 bg-amber-100/50 rounded-sm ring-1 ring-black/10">
                            <ChessPiece type={p as any} color="w" position="cap" draggable={false} />
                        </div>
                    ))}
                </div>
                {blackScore > whiteScore && (
                    <span className="text-xs text-slate-400 font-mono">+{blackScore - whiteScore}</span>
                )}
            </div>

            {/* Bottom Player (White in default 'w' orientation) */}
            <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded border border-slate-800 h-12">
                <div className="flex -space-x-2">
                    {captured.w.map((p, i) => (
                        <div key={i} className="w-6 h-6 transform scale-75 bg-amber-100/50 rounded-sm ring-1 ring-black/10">
                            <ChessPiece type={p as any} color="b" position="cap" draggable={false} />
                        </div>
                    ))}
                </div>
                {whiteScore > blackScore && (
                    <span className="text-xs text-slate-400 font-mono">+{whiteScore - blackScore}</span>
                )}
            </div>
        </div>
    );
};
