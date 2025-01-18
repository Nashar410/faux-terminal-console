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
      
      <div className="grid grid-cols-[2fr,1fr] gap-8">
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

        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 100 200"
            className="w-32 h-64 text-terminal-text"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            {/* Base du pétard - visible quand le premier composant est correct */}
            <g style={{ display: assemblyZone[0]?.id === correctOrder[0] ? 'block' : 'none' }}>
              <rect x="35" y="150" width="30" height="40" />
              <line x1="40" y1="150" x2="40" y2="190" />
              <line x1="50" y1="150" x2="50" y2="190" />
              <line x1="60" y1="150" x2="60" y2="190" />
            </g>

            {/* Corps du pétard - visible quand les deux premiers composants sont corrects */}
            <g style={{ 
              display: assemblyZone[0]?.id === correctOrder[0] && 
                       assemblyZone[1]?.id === correctOrder[1] ? 'block' : 'none' 
            }}>
              <rect x="30" y="70" width="40" height="80" />
              <path d="M30,110 Q50,120 70,110" />
              <path d="M30,90 Q50,100 70,90" />
            </g>

            {/* Mèche du pétard - visible quand tous les composants sont corrects */}
            <g style={{ 
              display: assemblyZone[0]?.id === correctOrder[0] && 
                       assemblyZone[1]?.id === correctOrder[1] &&
                       assemblyZone[2]?.id === correctOrder[2] ? 'block' : 'none' 
            }}>
              <path d="M50,70 Q30,50 50,30 Q70,10 50,0" />
              <circle cx="50" cy="0" r="3" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};