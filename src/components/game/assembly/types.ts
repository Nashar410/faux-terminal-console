export type Component = {
  id: string;
  name: string;
};

export const initialComponents: Component[] = [
  { id: 'fuel', name: 'Carburant' },
  { id: 'oxidizer', name: 'Comburant' },
  { id: 'combustible', name: 'Combustible' }
];

// Mélange aléatoire des composants
export const getRandomizedComponents = () => {
  return [...initialComponents].sort(() => Math.random() - 0.5);
};

export const correctOrder = ['fuel', 'oxidizer', 'combustible'];