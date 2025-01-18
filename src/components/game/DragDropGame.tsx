import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useToast } from "@/hooks/use-toast";
import { decodeBase64 } from '@/utils/encoding';
import strings from '@/data/strings.json';

type Word = {
  id: string;
  content: string;
  correctColumn: 'positive' | 'negative';
};

type DragDropGameProps = {
  onComplete: () => void;
};

const DragDropGame = ({ onComplete }: DragDropGameProps) => {
  const [words] = useState<Word[]>(strings.game.dragDrop.words as Word[]);
  const [columns, setColumns] = useState({
    unassigned: strings.game.dragDrop.words.map(w => w.id),
    positive: [],
    negative: []
  });
  const { toast } = useToast();

  const checkCompletion = () => {
    if ((columns.positive.length + columns.negative.length) === words.length) {
      const allCorrect = [...columns.positive, ...columns.negative].every(wordId => {
        const word = words.find(w => w.id === wordId);
        const column = columns.positive.includes(wordId) ? 'positive' : 'negative';
        return word?.correctColumn === column;
      });

      if (allCorrect) {
        toast({
          title: "Bravo !",
          description: decodeBase64(strings.game.dragDrop.success),
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setTimeout(() => {
          onComplete();
        }, 1500);
      } else {
        toast({
          variant: "destructive",
          description: decodeBase64(strings.game.dragDrop.error),
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setColumns({
          unassigned: strings.game.dragDrop.words.map(w => w.id),
          positive: [],
          negative: []
        });
      }
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) return;

    setColumns(prev => ({
      ...prev,
      [sourceCol]: prev[sourceCol as keyof typeof prev].filter(id => id !== draggableId),
      [destCol]: [...prev[destCol as keyof typeof prev], draggableId]
    }));
  };

  useEffect(() => {
    checkCompletion();
  }, [columns]);

  return (
    <div className="mt-8 font-mono text-terminal-text">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col space-y-8">
          <Droppable droppableId="unassigned" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[100px] p-4 border border-terminal-text flex flex-wrap gap-4"
              >
                {columns.unassigned.map((wordId, index) => {
                  const word = words.find(w => w.id === wordId);
                  return (
                    <Draggable key={wordId} draggableId={wordId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="px-4 py-2 border border-terminal-text cursor-move"
                        >
                          {word?.content}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="grid grid-cols-2 gap-8">
            <Droppable droppableId="positive">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[200px] p-4 border border-terminal-text"
                >
                  <h2 className="mb-4 text-center border-b border-terminal-text">Positif</h2>
                  <div className="flex flex-wrap gap-4">
                    {columns.positive.map((wordId, index) => {
                      const word = words.find(w => w.id === wordId);
                      return (
                        <Draggable key={wordId} draggableId={wordId} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="px-4 py-2 border border-terminal-text cursor-move"
                            >
                              {word?.content}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="negative">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[200px] p-4 border border-terminal-text"
                >
                  <h2 className="mb-4 text-center border-b border-terminal-text">Négatif</h2>
                  <div className="flex flex-wrap gap-4">
                    {columns.negative.map((wordId, index) => {
                      const word = words.find(w => w.id === wordId);
                      return (
                        <Draggable key={wordId} draggableId={wordId} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="px-4 py-2 border border-terminal-text cursor-move"
                            >
                              {word?.content}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragDropGame;