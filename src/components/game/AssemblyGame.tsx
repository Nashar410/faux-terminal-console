import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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
    setAvailableComponents([...initialComponents].sort(() => Math.random() - 0.5));
  }, []);

  const checkAssembly = () => {
    const isCorrect = assemblyZone.every((component, index) => 
      component.id === correctOrder[index]
    );

    if (isCorrect) {
      toast({
        title: "Assemblage réussi !",
        description: "La réaction explosive est parfaite. Indice : La base d'une entreprise réside dans l'équilibre des forces.",
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
      // Réinitialiser
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

        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 100 200"
            className="w-32 h-64 text-terminal-text"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            {/* Base du pétard - visible quand le premier composant est placé */}
            <g style={{ display: assemblyZone.length >= 1 ? 'block' : 'none' }}>
              <rect x="35" y="150" width="30" height="40" />
              <line x1="40" y1="150" x2="40" y2="190" />
              <line x1="50" y1="150" x2="50" y2="190" />
              <line x1="60" y1="150" x2="60" y2="190" />
            </g>

            {/* Corps du pétard - visible quand deux composants sont placés */}
            <g style={{ display: assemblyZone.length >= 2 ? 'block' : 'none' }}>
              <rect x="30" y="70" width="40" height="80" />
              <path d="M30,110 Q50,120 70,110" />
              <path d="M30,90 Q50,100 70,90" />
            </g>

            {/* Mèche du pétard - visible quand tous les composants sont placés */}
            <g style={{ display: assemblyZone.length === 3 ? 'block' : 'none' }}>
              <path d="M50,70 Q30,50 50,30 Q70,10 50,0" />
              <circle cx="50" cy="0" r="3" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};