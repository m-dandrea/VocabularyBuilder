// Dictionary data layer: validates stable IDs and the three learning levels.
window.Dictionary = (() => {
  const levels = ['easy','medium','advanced'];
  const topics = [
    ['basics','Basics & conversation'], ['numbers-time','Numbers & time'], ['colors','Colors'],
    ['people','People & family'], ['food','Food & drink'], ['home','Home'],
    ['travel','Travel & places'], ['work','Work & study'], ['health','Body & health'],
    ['animals-nature','Animals & nature'], ['actions','Actions'], ['everyday','Everyday things']
  ].map(([id, label]) => ({id, label}));
  const groups = {
    'numbers-time': `number time day week month year today tomorrow yesterday morning evening night minute hour second monday tuesday wednesday thursday friday saturday sunday january february march april may june july august september october november december weekend season spring summer autumn winter calendar clock birthday date`,
    colors: `red blue green yellow black white grey gray brown orange purple pink colour color`,
    people: `person people man woman boy girl child children mother father sister brother family friend neighbour neighbor colleague partner husband wife son daughter baby parent guest name`,
    food: `food drink bread butter cheese milk beer wine tea coffee juice egg meat fish chicken rice potato vegetable fruit apple banana tomato onion salt sugar breakfast lunch dinner restaurant café cafe kitchen hungry thirsty meal`,
    home: `home house apartment room bathroom door window table chair bed sofa lamp floor wall roof garden balcony key furniture`,
    travel: `car bicycle bike bus train metro plane taxi ticket map trip travel street road bridge station airport country city town village hotel beach place`,
    work: `work job office school university teacher student lesson book word language paper pen computer meeting company money price`,
    health: `head face hair eye ear nose mouth hand arm leg foot heart body health doctor dentist hospital ill sick well pain medicine`,
    'animals-nature': `animal dog cat bird horse cow pig sheep mouse bear lion tiger fish insect tree flower forest sea ocean river lake mountain weather rain snow wind sun moon earth island`,
  };
  const topicFor = (word) => {
    if (['pronoun','preposition','conjunction','determiner','question word','expression'].includes(word.type)) return 'basics';
    if (word.type === 'number') return 'numbers-time';
    const text = `${word.da} ${word.en}`.toLowerCase().replace(/[^a-zæøå0-9]+/g, ' ');
    const tokens = new Set(text.trim().split(/\s+/));
    for (const [topic, terms] of Object.entries(groups)) {
      if (terms.split(' ').some((term) => tokens.has(term))) return topic;
    }
    if (word.type === 'verb') return 'actions';
    return 'everyday';
  };
  const build = (words) => {
    if (words.length !== 1000) throw new Error('Dictionary must contain exactly 1,000 words.');
    if (new Set(words.map((word) => word.id)).size !== words.length) throw new Error('Dictionary word IDs must be unique.');
    if (words.some((word) => !levels.includes(word.difficulty))) throw new Error('Every word must have a valid difficulty.');
    return words.map((word) => ({...word, topic:topicFor(word)}));
  };
  return {levels, topics, build};
})();
