import findTheBall from './find-the-ball.js';

// Add another mode by importing its module and adding it to this list.
export const modes = [findTheBall];
export const getMode = id => modes.find(mode => mode.id === id) ?? modes[0];
