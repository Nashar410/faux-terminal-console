import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DraggableWord } from './DraggableWord';
import { Word } from '@/types/game';

type DroppableColumnProps = {
  id: string;
  title?: string;
  words: Word[];
  className?: string;
};

export const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  title,
  words,
  className = ""
}) => {
  return (
    <Droppable droppableId={id} direction={id === "unassigned" ? "horizontal" : "vertical"}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`min-h-[100px] p-4 border border-terminal-text ${className}`}
        >
          {title && (
            <h2 className="mb-4 text-center border-b border-terminal-text">{title}</h2>
          )}
          <div className="flex flex-wrap gap-4">
            {words.map((word, index) => (
              <DraggableWord key={word.id} word={word} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};