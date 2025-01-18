export const WORD_TO_GUESS = "DETERMINISME";
export const MAX_ERRORS = 3;
export const TOTAL_CREDITS = 600;
export const WRONG_GUESS_COST = 200;

export const hiddenUniqueLetters = new Set(WORD_TO_GUESS.slice(1).split('')).size;
export const COST_PER_CORRECT_LETTER = Math.floor(
  (TOTAL_CREDITS - WRONG_GUESS_COST - 1) / hiddenUniqueLetters
);