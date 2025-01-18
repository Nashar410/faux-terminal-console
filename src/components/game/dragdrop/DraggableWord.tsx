import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Word } from '@/types/game';

type DraggableWordProps = {
  word: Word;
  index: number;
};

export const DraggableWord: React.FC<DraggableWordProps> = ({ word, index }) => {
  return (
    <Draggable draggableId={word.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="px-4 py-2 border border-terminal-text cursor-move"
        >
          {word.content}
        </div>
      )}
    </Draggable>
  );
};