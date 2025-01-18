import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Component } from './types';

type DragDropZoneProps = {
  id: string;
  items: Component[];
  title: string;
};

export const DragDropZone: React.FC<DragDropZoneProps> = ({ id, items, title }) => {
  return (
    <div>
      <h3 className="mb-4">{title}</h3>
      <Droppable droppableId={id} direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-4 min-h-[100px] p-4 border border-terminal-text"
          >
            {items.map((component, index) => (
              <Draggable
                key={component.id}
                draggableId={component.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="px-4 py-2 border border-terminal-text cursor-move bg-terminal-bg"
                  >
                    {component.name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};