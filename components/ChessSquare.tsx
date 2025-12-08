import React from 'react';
import { useDrop } from 'react-dnd';
import { ChessPiece } from './ChessPiece';

interface ChessSquareProps {
    position: string;
    piece: { type: string; color: 'w' | 'b' } | null;
    isBlack: boolean;
    onDrop: (from: string, to: string) => void;
    onClick?: () => void;
    highlight?: boolean;
    isSelected?: boolean;
    isOption?: boolean;
}

export const ChessSquare: React.FC<ChessSquareProps> = ({
    position,
    piece,
    isBlack,
    onDrop,
    onClick,
    highlight,
    isSelected,
    isOption
}) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'PIECE',
        drop: (item: { from: string }) => {
            onDrop(item.from, position);
        },
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [position, onDrop]);

    return (
        <div
            ref={(node: any) => { if (node) drop(node); }}
            onClick={onClick}
            className={`w-full h-full flex items-center justify-center relative select-none
        ${isBlack ? 'bg-amber-800' : 'bg-amber-200'}
        ${isSelected ? 'ring-4 ring-yellow-400 inset-0 z-10' : ''}
        ${isOver && canDrop ? 'ring-4 ring-yellow-400 inset-0 z-10' : ''}
        ${highlight ? 'bg-yellow-200/50' : ''}
        ${isOption && !piece ? 'cursor-pointer' : '' /* Pointer for empty move options */}
        ${isOption && piece ? 'cursor-alias' : '' /* Alias cursor for captures */}
      `}
        >
            {/* Move Indicator (Dot) */}
            {isOption && !piece && (
                <div className="absolute w-3 h-3 bg-black/20 rounded-full z-0"></div>
            )}

            {/* Capture Indicator (Ring) */}
            {isOption && piece && (
                <div className="absolute w-full h-full border-[6px] border-black/10 rounded-full z-0"></div>
            )}

            {piece && (
                <div className="z-10 w-full h-full flex items-center justify-center">
                    <ChessPiece type={piece.type as any} color={piece.color as any} position={position} />
                </div>
            )}

            {position.endsWith('1') && (
                <span className={`absolute bottom-0.5 right-1 text-xs font-bold ${isBlack ? 'text-amber-200' : 'text-amber-800'}`}>
                    {position[0]}
                </span>
            )}
            {position.startsWith('a') && (
                <span className={`absolute top-0.5 left-1 text-xs font-bold ${isBlack ? 'text-amber-200' : 'text-amber-800'}`}>
                    {position[1]}
                </span>
            )}
        </div>
    );
};
