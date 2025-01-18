export type Component = {
  id: string;
  name: string;
};

export const initialComponents: Component[] = [
  { id: 'fuel', name: 'Carburant' },
  { id: 'oxidizer', name: 'Comburant' },
  { id: 'combustible', name: 'Combustible' }
];

export const correctOrder = ['fuel', 'oxidizer', 'combustible'];