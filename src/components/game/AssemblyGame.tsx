import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { DragDropZone } from './assembly/DragDropZone';
import { FirecrackerPreview } from './assembly/FirecrackerPreview';
import { Component, getRandomizedComponents, correctOrder, initialComponents } from './assembly/types';
import {decodeBase64} from "@/utils/encoding.ts";
import strings from "@/data/strings.json";

type AssemblyGameProps = {
  onComplete: () => void;
};

export const AssemblyGame: React.FC<AssemblyGameProps> = ({ onComplete }) => {
  const [availableComponents, setAvailableComponents] = useState<Component[]>([]);
  const [assemblyZone, setAssemblyZone] = useState<Component[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setAvailableComponents(getRandomizedComponents());
  }, []);

  const checkAssembly = () => {
    const isCorrect = assemblyZone.every((component, index) => 
      component.id === correctOrder[index]
    );

    if (isCorrect) {
      toast({
        title: decodeBase64(strings.finalForm.hints.choix),
        description: "La réaction explosive est parfaite",
        className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
      });
      setTimeout(onComplete, 1500);
    } else {
      toast({
        variant: "destructive",
        title: "Mauvais assemblage...",
        description: "La base n'est pas solide. Réessayez !",
        className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
      });
      setAvailableComponents([...initialComponents].sort(() => Math.random() - 0.5));
      setAssemblyZone([]);
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const component = source.droppableId === 'available'
      ? availableComponents[source.index]
      : assemblyZone[source.index];

    if (source.droppableId === 'available') {
      setAvailableComponents(prev => prev.filter((_, index) => index !== source.index));
    } else {
      setAssemblyZone(prev => prev.filter((_, index) => index !== source.index));
    }

    if (destination.droppableId === 'available') {
      setAvailableComponents(prev => {
        const newItems = [...prev];
        newItems.splice(destination.index, 0, component);
        return newItems;
      });
    } else {
      setAssemblyZone(prev => {
        const newItems = [...prev];
        newItems.splice(destination.index, 0, component);
        return newItems;
      });
    }
  };

  return (
    <div className="mt-8 font-mono text-terminal-text">
      <h2 className="text-xl mb-6">Assemblage du Détonnant Parfait</h2>
      
      <div className="grid grid-cols-[2fr,1fr] gap-8">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-8">
            <DragDropZone
              id="available"
              items={availableComponents}
              title="Composants Disponibles"
            />

            <DragDropZone
              id="assembly"
              items={assemblyZone}
              title="Zone d'Assemblage"
            />

            {assemblyZone.length === 3 && (
              <div className="flex justify-center">
                <Button 
                  onClick={checkAssembly}
                  className="bg-terminal-text text-terminal-bg hover:bg-terminal-text/80"
                >
                  Valider la construction
                </Button>
              </div>
            )}
          </div>
        </DragDropContext>

        <FirecrackerPreview partsVisible={assemblyZone.length} />
      </div>
    </div>
  );
};