export type Component = {
  id: string;
  name: string;
};

export const initialComponents: Component[] = [
  { id: 'fuel', name: 'Carburant (soi)' },
  { id: 'oxidizer', name: 'Comburant (motivation)' },
  { id: 'combustible', name: 'Combustible (oppréssion)' }
];

// Mélange aléatoire des composants
export const getRandomizedComponents = () => {
  return [...initialComponents].sort(() => Math.random() - 0.5);
};

export const correctOrder = ['fuel', 'oxidizer', 'combustible'];