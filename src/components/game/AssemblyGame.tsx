import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useToast } from "@/hooks/use-toast";
import { decodeBase64 } from '@/utils/encoding';

type Component = {
  id: string;
  name: string;
};

type AssemblyGameProps = {
  onComplete: () => void;
};

const initialComponents: Component[] = [
  { id: 'fuel', name: 'Carburant' },
  { id: 'oxidizer', name: 'Comburant' },
  { id: 'combustible', name: 'Combustible' }
];

const correctOrder = ['fuel', 'oxidizer', 'combustible'];

export const AssemblyGame: React.FC<AssemblyGameProps> = ({ onComplete }) => {
  const [availableComponents, setAvailableComponents] = useState<Component[]>([]);
  const [assemblyZone, setAssemblyZone] = useState<Component[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mélanger les composants au chargement
    setAvailableComponents([...initialComponents].sort(() => Math.random() - 0.5));
  }, []);

  const checkAssembly = () => {
    if (assemblyZone.length !== correctOrder.length) return;
    
    const isCorrect = assemblyZone.every((component, index) => 
      component.id === correctOrder[index]
    );

    if (isCorrect) {
      toast({
        title: "Assemblage réussi !",
        description: "La réaction explosive est parfaite.",
        className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
      });
      setTimeout(onComplete, 1500);
    } else {
      toast({
        variant: "destructive",
        description: "L'ordre d'assemblage n'est pas correct. Réessayez !",
        className: "font-mono bg-terminal-bg border-terminal-text text-terminal-text",
      });
      // Réinitialiser
      setAvailableComponents([...initialComponents].sort(() => Math.random() - 0.5));
      setAssemblyZone([]);
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const component = source.droppableId === 'available'
      ? availableComponents[source.index]
      : assemblyZone[source.index];

    // Retirer le composant de sa source
    if (source.droppableId === 'available') {
      setAvailableComponents(prev => prev.filter((_, index) => index !== source.index));
    } else {
      setAssemblyZone(prev => prev.filter((_, index) => index !== source.index));
    }

    // Ajouter le composant à sa destination
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

    // Vérifier l'assemblage si la zone d'assemblage est pleine
    if (destination.droppableId === 'assembly' && assemblyZone.length === 2) {
      setTimeout(checkAssembly, 100);
    }
  };

  return (
    <div className="mt-8 font-mono text-terminal-text">
      <h2 className="text-xl mb-6">Assemblage du Détonnant Parfait</h2>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="space-y-8">
          <div>
            <h3 className="mb-4">Composants Disponibles</h3>
            <Droppable droppableId="available" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex gap-4 min-h-[100px] p-4 border border-terminal-text"
                >
                  {availableComponents.map((component, index) => (
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

          <div>
            <h3 className="mb-4">Zone d'Assemblage</h3>
            <Droppable droppableId="assembly" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex gap-4 min-h-[100px] p-4 border border-terminal-text"
                >
                  {assemblyZone.map((component, index) => (
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
        </div>
      </DragDropContext>
    </div>
  );
};