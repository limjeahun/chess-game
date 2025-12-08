import React from 'react';
import { useDrag } from 'react-dnd';

interface ChessPieceProps {
    type: string;
    color: 'w' | 'b';
    position: string;
    draggable?: boolean;
}

const PIECE_IMAGES: Record<string, string> = {
    wP: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png',
    wN: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png',
    wB: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png',
    wR: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png',
    wQ: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png',
    wK: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png',
    bP: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png',
    bN: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png',
    bB: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png',
    bR: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png',
    bQ: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png',
    bK: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png',
};

export const ChessPiece: React.FC<ChessPieceProps> = ({ type, color, position, draggable = true }) => {
    const pieceKey = `${color}${type.toUpperCase()}`;
    const image = PIECE_IMAGES[pieceKey];

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PIECE',
        item: { type, color, from: position },
        canDrag: draggable,
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [position, type, color, draggable]);

    if (!image) return null;

    return (
        <div
            ref={(node: any) => { if (node) drag(node); }}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: draggable ? 'grab' : 'default',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <img src={image} alt={`${color} ${type}`} className="w-[80%] h-[80%] select-none pointer-events-none" />
        </div>
    );
};
