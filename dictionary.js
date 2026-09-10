// Dictionary data layer: validates stable IDs and the three learning levels.
const Dictionary = (() => {
  const levels = ['easy','medium','advanced'];
  const build = (words) => {
    if (words.length !== 1000) throw new Error('Dictionary must contain exactly 1,000 words.');
    if (new Set(words.map((word) => word.id)).size !== words.length) throw new Error('Dictionary word IDs must be unique.');
    if (words.some((word) => !levels.includes(word.difficulty))) throw new Error('Every word must have a valid difficulty.');
    return words;
  };
  return {levels, build};
})();
