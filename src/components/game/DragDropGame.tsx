import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useToast } from "@/hooks/use-toast";
import { decodeBase64 } from '@/utils/encoding';
import { DroppableColumn } from './dragdrop/DroppableColumn';
import strings from '@/data/strings.json';
import { Word } from '@/types/game';

type DragDropGameProps = {
  onComplete: () => void;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const DragDropGame = ({ onComplete }: DragDropGameProps) => {
  const [words] = useState<Word[]>(() => shuffleArray(strings.game.dragDrop.words as Word[]));
  const [columns, setColumns] = useState({
    unassigned: shuffleArray(strings.game.dragDrop.words.map(w => w.id)),
    positive: [],
    negative: []
  });
  const { toast } = useToast();

  const getWordsForColumn = (columnId: keyof typeof columns) => {
    return columns[columnId].map(id => words.find(w => w.id === id)!);
  };

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
          setColumns({
            unassigned: [],
            positive: [],
            negative: []
          });
          onComplete();
        }, 1500);
      } else {
        toast({
          variant: "destructive",
          description: decodeBase64(strings.game.dragDrop.error),
          className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
        });
        setColumns({
          unassigned: shuffleArray(strings.game.dragDrop.words.map(w => w.id)),
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
          <DroppableColumn
            id="unassigned"
            words={getWordsForColumn('unassigned')}
          />

          <div className="grid grid-cols-2 gap-8">
            <DroppableColumn
              id="positive"
              title="Positif"
              words={getWordsForColumn('positive')}
            />
            <DroppableColumn
              id="negative"
              title="Négatif"
              words={getWordsForColumn('negative')}
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragDropGame;