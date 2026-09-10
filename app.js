const CORE_WORDS = [
  ['at være','to be','verb','Jeg vil gerne ___ hjemme.'],['at have','to have','verb','Jeg vil gerne ___ en kaffe.'],['at gøre','to do','verb','Hvad skal vi ___?'],['at sige','to say','verb','Hvad vil du ___?'],['at gå','to go / walk','verb','Jeg skal ___ nu.'],
  ['at komme','to come','verb','Kan du ___ i morgen?'],['at se','to see','verb','Jeg kan ___ havet.'],['at vide','to know','verb','Jeg vil gerne ___ mere.'],['at kunne','can / to be able to','verb','Det er godt at ___ tale lidt dansk.'],['at ville','to want','verb','Det er okay ikke at ___ med.'],
  ['at tage','to take','verb','Jeg ___ toget på arbejde.'],['at finde','to find','verb','Jeg kan ikke ___ mine nøgler.'],['at give','to give','verb','Kan du ___ mig saltet?'],['at spise','to eat','verb','Vi skal ___ sammen.'],['at drikke','to drink','verb','Vil du ___ kaffe?'],
  ['at bo','to live / reside','verb','Jeg ___ på Nørrebro.'],['at arbejde','to work','verb','Jeg ___ i København.'],['at tale','to speak','verb','Kan du ___ langsommere?'],['at forstå','to understand','verb','Jeg kan ___ det meste.'],['at spørge','to ask','verb','Du kan altid ___ mig.'],
  ['at købe','to buy','verb','Jeg skal ___ ind i dag.'],['at bruge','to use','verb','Hvordan skal jeg ___ den?'],['at hjælpe','to help','verb','Kan du ___ mig?'],['at vente','to wait','verb','Jeg ___ ved stationen.'],['at huske','to remember','verb','Kan du ___ adressen?'],
  ['en dag','a day','noun','Det har været en lang ___.'],['en uge','a week','noun','Jeg bliver her i en ___.'],['et år','a year','noun','Jeg har boet her i et ___.'],['en tid','a time / period','noun','Det tager lang ___.'],['en ven','a friend','noun','Hun er min gode ___.'],
  ['en familie','a family','noun','Jeg besøger min ___ i weekenden.'],['et hus','a house','noun','De bor i et gammelt ___.'],['et arbejde','a job / work','noun','Jeg har fået nyt ___.'],['en by','a city','noun','København er en dejlig ___.'],['et sted','a place','noun','Det er et hyggeligt ___.'],
  ['en vej','a road / way','noun','Hvilken ___ skal vi tage?'],['en ting','a thing','noun','Jeg har glemt en ___.'],['et spørgsmål','a question','noun','Jeg har et ___.'],['et svar','an answer','noun','Jeg kender ikke ___.'],['en morgen','a morning','noun','Det var en travl ___.'],
  ['en aften','an evening','noun','Vi havde en god ___.'],['mad','food','noun','Vi laver ___ sammen.'],['vand','water','noun','Må jeg få et glas ___?'],['kaffe','coffee','noun','Jeg drikker ___ om morgenen.'],['penge','money','noun','Det koster mange ___.'],
  ['stor','big','adjective','De bor i en ___ lejlighed.'],['lille','small','adjective','Jeg vil gerne have en ___ kaffe.'],['god','good','adjective','Det er en ___ idé.'],['dårlig','bad','adjective','Vejret er ___.'],['ny','new','adjective','Jeg har købt en ___ cykel.'],
  ['gammel','old','adjective','Det er en ___ bygning.'],['smuk','beautiful','adjective','Sikke en ___ udsigt.'],['nem','easy','adjective','Opgaven er ret ___.'],['svær','difficult','adjective','Dansk udtale kan være ___.'],['vigtig','important','adjective','Det er en ___ beslutning.'],
  ['glad','happy','adjective','Jeg er ___ i dag.'],['træt','tired','adjective','Jeg er meget ___.'],['hurtig','fast','adjective','Hun er en ___ løber.'],['langsom','slow','adjective','Bussen er ___.'],['varm','warm','adjective','Kaffen er stadig ___.'],
  ['kold','cold','adjective','Det er ___ udenfor.'],['nu','now','adverb','Vi skal gå ___.'],['her','here','adverb','Jeg bor ___.'],['der','there','adverb','Cyklen står ___.'],['altid','always','adverb','Han kommer ___ til tiden.'],
  ['aldrig','never','adverb','Jeg drikker ___ kaffe om aftenen.'],['ofte','often','adverb','Jeg cykler ___ på arbejde.'],['måske','maybe','adverb','___ kommer hun senere.'],['meget','very / much','adverb','Det er ___ hyggeligt.'],['også','also','adverb','Jeg vil ___ gerne med.'],
  ['sammen','together','adverb','Skal vi spise ___?'],['hjem','home','adverb','Jeg tager ___ efter arbejde.'],['i dag','today','adverb','Hvad laver du ___?'],['i morgen','tomorrow','adverb','Vi ses ___.'],['i går','yesterday','adverb','Jeg arbejdede hjemme ___.'],
  ['én','one','number','Jeg vil gerne have ___ kaffe.'],['to','two','number','Vi er ___ personer.'],['tre','three','number','Det tager ___ minutter.'],['fire','four','number','Bordet har ___ ben.'],['fem','five','number','Vi mødes klokken ___.'],
  ['hvem','who','question word','___ kommer i aften?'],['hvad','what','question word','___ hedder du?'],['hvor','where','question word','___ bor du?'],['hvornår','when','question word','___ kommer toget?'],['hvorfor','why','question word','___ lærer du dansk?'],
  ['ja','yes','expression','___, det vil jeg gerne.'],['nej','no','expression','___, ellers tak.'],['tak','thank you','expression','Mange ___ for hjælpen.'],['undskyld','sorry / excuse me','expression','___, hvor er stationen?'],['selvfølgelig','of course','expression','___ kan jeg hjælpe.']
];

// A deliberately curated extension: everyday words, not a scraped dictionary.
const EXTRA_WORDS = `
hej|hello|expression;farvel|goodbye|expression;goddag|good day|expression;godnat|good night|expression;velkommen|welcome|expression;vær så god|here you are|expression;skål|cheers|expression;ingen årsag|you’re welcome|expression;god fornøjelse|enjoy|expression;held og lykke|good luck|expression;
mandag|Monday|noun;tirsdag|Tuesday|noun;onsdag|Wednesday|noun;torsdag|Thursday|noun;fredag|Friday|noun;lørdag|Saturday|noun;søndag|Sunday|noun;januar|January|noun;februar|February|noun;marts|March|noun;april|April|noun;maj|May|noun;juni|June|noun;juli|July|noun;august|August|noun;september|September|noun;oktober|October|noun;november|November|noun;december|December|noun;
forår|spring|noun;sommer|summer|noun;efterår|autumn|noun;vinter|winter|noun;minut|minute|noun;time|hour|noun;sekund|second|noun;weekend|weekend|noun;ferie|holiday|noun;frokost|lunch|noun;morgenmad|breakfast|noun;aftensmad|dinner|noun;
mor|mother|noun;far|father|noun;søster|sister|noun;bror|brother|noun;børn|children|noun;barn|child|noun;mand|man|noun;kvinde|woman|noun;pige|girl|noun;dreng|boy|noun;menneske|person|noun;nabo|neighbour|noun;kollega|colleague|noun;kæreste|partner|noun;
lejlighed|apartment|noun;værelse|room|noun;køkken|kitchen|noun;badeværelse|bathroom|noun;dør|door|noun;vindue|window|noun;bord|table|noun;stol|chair|noun;seng|bed|noun;sofa|sofa|noun;lampe|lamp|noun;gulv|floor|noun;væg|wall|noun;tag|roof|noun;have|garden|noun;altan|balcony|noun;nøgle|key|noun;taske|bag|noun;
telefon|phone|noun;computer|computer|noun;skærm|screen|noun;internet|internet|noun;brev|letter|noun;besked|message|noun;bog|book|noun;avis|newspaper|noun;papir|paper|noun;pen|pen|noun;ord|word|noun;sprog|language|noun;navn|name|noun;nummer|number|noun;billede|picture|noun;musik|music|noun;film|film|noun;spil|game|noun;
butik|shop|noun;supermarked|supermarket|noun;marked|market|noun;restaurant|restaurant|noun;café|café|noun;bar|bar|noun;bank|bank|noun;apotek|pharmacy|noun;skole|school|noun;universitet|university|noun;kontor|office|noun;station|station|noun;lufthavn|airport|noun;hospital|hospital|noun;læge|doctor|noun;tandlæge|dentist|noun;politi|police|noun;
cykel|bicycle|noun;bil|car|noun;bus|bus|noun;tog|train|noun;metro|metro|noun;fly|plane|noun;taxa|taxi|noun;billet|ticket|noun;kort|map|noun;rejse|trip|noun;gade|street|noun;bro|bridge|noun;park|park|noun;strand|beach|noun;skov|forest|noun;land|country|noun;ø|island|noun;
brød|bread|noun;smør|butter|noun;ost|cheese|noun;mælk|milk|noun;øl|beer|noun;vin|wine|noun;te|tea|noun;juice|juice|noun;æg|egg|noun;kød|meat|noun;fisk|fish|noun;kylling|chicken|noun;ris|rice|noun;kartoffel|potato|noun;grøntsag|vegetable|noun;frugt|fruit|noun;æble|apple|noun;banan|banana|noun;tomat|tomato|noun;løg|onion|noun;salt|salt|noun;sukker|sugar|noun;
hoved|head|noun;ansigt|face|noun;hår|hair|noun;øje|eye|noun;øre|ear|noun;næse|nose|noun;mund|mouth|noun;hånd|hand|noun;arm|arm|noun;ben|leg|noun;fod|foot|noun;hjerte|heart|noun;krop|body|noun;helbred|health|noun;syg|ill|adjective;rask|well|adjective;sulten|hungry|adjective;tørstig|thirsty|adjective;
rød|red|adjective;blå|blue|adjective;grøn|green|adjective;gul|yellow|adjective;sort|black|adjective;hvid|white|adjective;grå|grey|adjective;brun|brown|adjective;lys|light|adjective;mørk|dark|adjective;ren|clean|adjective;beskidt|dirty|adjective;billig|cheap|adjective;dyr|expensive|adjective;åben|open|adjective;lukket|closed|adjective;fri|free|adjective;optaget|busy|adjective;klar|ready|adjective;sikker|safe / certain|adjective;
tidlig|early|adjective;sen|late|adjective;stærk|strong|adjective;svag|weak|adjective;let|light / easy|adjective;tung|heavy|adjective;høj|high / tall|adjective;lav|low|adjective;bred|wide|adjective;smal|narrow|adjective;billigere|cheaper|adjective;bedre|better|adjective;bedst|best|adjective;anderledes|different|adjective;samme|same|adjective;færdig|finished|adjective;mulig|possible|adjective;svensk|Swedish|adjective;dansk|Danish|adjective;
at læse|to read|verb;at skrive|to write|verb;at høre|to hear|verb;at lære|to learn|verb;at lære fra sig|to teach|verb;at åbne|to open|verb;at lukke|to close|verb;at starte|to start|verb;at stoppe|to stop|verb;at blive|to become / stay|verb;at møde|to meet|verb;at ringe|to call|verb;at sende|to send|verb;at betale|to pay|verb;at prøve|to try|verb;at vælge|to choose|verb;at planlægge|to plan|verb;at rejse|to travel|verb;at køre|to drive|verb;at cykle|to cycle|verb;at løbe|to run|verb;at sidde|to sit|verb;at stå|to stand|verb;at ligge|to lie|verb;at sove|to sleep|verb;at vågne|to wake up|verb;at vaske|to wash|verb;at lave|to make / cook|verb;at rydde|to tidy|verb;at rengøre|to clean|verb;at bære|to carry|verb;at holde|to hold / keep|verb;at føle|to feel|verb;at håbe|to hope|verb;at tænke|to think|verb;at tro|to believe|verb;at savne|to miss|verb;at elske|to love|verb;at lide|to like|verb;at hade|to hate|verb;at smile|to smile|verb;at grine|to laugh|verb;at græde|to cry|verb;at spille|to play|verb;at danse|to dance|verb;at synge|to sing|verb;at svømme|to swim|verb;at besøge|to visit|verb;at dele|to share|verb;at ændre|to change|verb;at fortsætte|to continue|verb;at begynde|to begin|verb;at ende|to end|verb;at ske|to happen|verb;at vise|to show|verb;at forklare|to explain|verb;at sammenligne|to compare|verb;at betale|to pay|verb;at vente på|to wait for|verb;at passe|to fit / suit|verb;
inde|inside|adverb;ude|outside|adverb;oppe|upstairs / up|adverb;nede|downstairs / down|adverb;foran|in front of|adverb;bagved|behind|adverb;ved siden af|next to|adverb;mellem|between|adverb;over|over|adverb;under|under|adverb;med|with|preposition;uden|without|preposition;for|for|preposition;fra|from|preposition;til|to|preposition;om|about|preposition;på|on|preposition;i|in|preposition;efter|after|preposition;før|before|preposition;
derfor|therefore|adverb;fordi|because|conjunction;men|but|conjunction;eller|or|conjunction;så|then / so|adverb;hvis|if|conjunction;mens|while|conjunction;når|when|conjunction;at|that / to|conjunction;ikke|not|adverb;kun|only|adverb;lige|just|adverb;igen|again|adverb;stadig|still|adverb;allerede|already|adverb;snart|soon|adverb;senere|later|adverb;tidligere|earlier|adverb;normalt|normally|adverb;virkelig|really|adverb;bare|just|adverb;helt|completely|adverb;
seks|six|number;syv|seven|number;otte|eight|number;ni|nine|number;ti|ten|number;elleve|eleven|number;tolv|twelve|number;tyve|twenty|number;tredive|thirty|number;hundrede|one hundred|number;tusind|one thousand|number;første|first|number;sidste|last|adjective;hver|each|determiner;alle|all|determiner;nogle|some|determiner;mange|many|determiner;få|few|determiner;mere|more|adverb;mindre|less|adverb;
min|my|pronoun;din|your|pronoun;hans|his|pronoun;hendes|her|pronoun;vores|our|pronoun;jeres|your plural|pronoun;deres|their|pronoun;jeg|I|pronoun;du|you|pronoun;han|he|pronoun;hun|she|pronoun;vi|we|pronoun;I|you plural|pronoun;de|they|pronoun;det|it|pronoun;den|it / that|pronoun;dette|this|pronoun;disse|these|pronoun;hvilken|which|question word;hvordan|how|question word;hvor meget|how much|question word;hvor mange|how many|question word
`.trim().split(';').filter(Boolean).map((row) => { const [da,en,type] = row.split('|'); return [da,en,type,'']; });

const WORDS = [...CORE_WORDS, ...EXTRA_WORDS].map(([da,en,type,sentence], id) => ({id,da,en,type,sentence}));

const DAY_MS = 86400000;
const todayKey = new Date().toISOString().slice(0,10);
const dayNumber = Math.floor((Date.now() - Date.UTC(2026,0,1)) / DAY_MS);
const batch = (offset = 0) => Array.from({length:10},(_,i)=>WORDS[((dayNumber + offset) * 10 + i) % WORDS.length]);
const todaysWords = batch(0);
const reviewWords = dayNumber > 0 ? batch(-1) : todaysWords;
const practicePool = [...todaysWords, ...reviewWords.filter(w=>!todaysWords.some(t=>t.id===w.id))];
const saved = JSON.parse(localStorage.getItem('tiOrdProgress') || '{}');
saved.seenDays = Array.from(new Set([...(saved.seenDays || []), todayKey])).sort();
saved.revealed = saved.revealed || {};
localStorage.setItem('tiOrdProgress', JSON.stringify(saved));

const $ = (s) => document.querySelector(s);
const shuffle = (a) => [...a].sort(() => Math.random() - .5);
const clean = (s) => s.toLowerCase().trim().replace(/[.,!?]/g,'').replace(/^at /,'').replace(/^(en|et) /,'');
const accepted = (input, answer) => answer.split('/').some(a => clean(a) === clean(input));

function consecutiveStreak(days) {
  const set = new Set(days); let streak = 0; const date = new Date(`${todayKey}T12:00:00Z`);
  while (set.has(date.toISOString().slice(0,10))) { streak++; date.setUTCDate(date.getUTCDate()-1); }
  return Math.max(streak,1);
}

function renderWords() {
  $('#todayLabel').textContent = new Intl.DateTimeFormat('en-DK',{weekday:'long',day:'numeric',month:'long'}).format(new Date()).toUpperCase();
  $('#streakCount').textContent = consecutiveStreak(saved.seenDays);
  $('#reviewNote').textContent = dayNumber > 0 ? 'Includes yesterday’s words for review.' : 'Today’s words will become tomorrow’s review.';
  $('#wordGrid').replaceChildren(...todaysWords.map((word,i)=>{
    const card = document.createElement('button');
    const isOpen = Boolean(saved.revealed[`${todayKey}-${word.id}`]);
    card.className = `word-card${isOpen ? ' revealed' : ''}`;
    card.setAttribute('aria-pressed',String(isOpen));
    card.innerHTML = `<span class="word-number">${String(i+1).padStart(2,'0')}</span><span class="word-main">${isOpen ? word.en : word.da}</span><span class="word-type">${isOpen ? word.da : word.type}</span>`;
    card.addEventListener('click',()=>{ saved.revealed[`${todayKey}-${word.id}`]=true; localStorage.setItem('tiOrdProgress',JSON.stringify(saved)); renderWords(); });
    return card;
  }));
  const count = todaysWords.filter(w=>saved.revealed[`${todayKey}-${w.id}`]).length;
  $('#learnedCount').textContent = count; $('#progressBar').style.width = `${count*10}%`;
}

const dialog = $('#practiceDialog');
let mode = '', queue = [], index = 0, score = 0;
function openPractice(nextMode) { mode=nextMode; index=0; score=0; queue=shuffle(practicePool).slice(0,10); dialog.showModal(); renderExercise(); }
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>openPractice(b.dataset.mode)));
$('#closeDialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{ if(e.target===dialog) dialog.close(); });

function finish() {
  $('#exerciseArea').innerHTML = `<div class="quiz"><p class="prompt">${score} / ${queue.length}</p><p class="feedback good">Session complete. A little Danish every day adds up.</p><button class="primary next" id="again">Practise again</button></div>`;
  $('#again').onclick=()=>openPractice(mode);
}

function renderExercise() {
  if(index>=queue.length) return finish();
  const w=queue[index];
  if(mode==='bingo') return renderBingo(w);
  const danishFirst=mode==='da-en'; const prompt=danishFirst?w.da:w.en; const answer=danishFirst?w.en:w.da;
  $('#modeLabel').textContent = `${index+1} OF ${queue.length}`;
  $('#dialogTitle').textContent = danishFirst?'Translate to English':'Translate to Danish';
  $('#exerciseArea').innerHTML=`<div class="quiz"><p class="quiz-progress">Type the translation</p><p class="prompt">${prompt}</p><form class="answer-row"><input id="answer" autocomplete="off" autocapitalize="none" aria-label="Your translation" placeholder="Your answer…"><button class="primary">Check</button></form><div class="feedback" id="feedback"></div></div>`;
  const input=$('#answer'); input.focus();
  $('#exerciseArea form').onsubmit=e=>{e.preventDefault();const ok=accepted(input.value,answer);if(ok)score++;$('#feedback').className=`feedback ${ok?'good':'bad'}`;$('#feedback').textContent=ok?'Correct!':`Answer: ${answer}`;input.disabled=true;e.submitter.textContent='Next';e.submitter.onclick=()=>{index++;renderExercise()};};
}

function renderBingo(w) {
  const options=shuffle([w,...shuffle(practicePool.filter(x=>x.id!==w.id)).slice(0,8)]);
  $('#modeLabel').textContent=`${index+1} OF ${queue.length}`; $('#dialogTitle').textContent='Word bingo';
  $('#exerciseArea').innerHTML=`<div class="quiz"><p class="bingo-prompt">Find the Danish word for <strong>${w.en}</strong></p><div class="bingo-grid">${options.map(x=>`<button class="bingo-cell" data-id="${x.id}">${x.da}</button>`).join('')}</div></div>`;
  document.querySelectorAll('.bingo-cell').forEach(cell=>cell.onclick=()=>{if(Number(cell.dataset.id)===w.id){cell.classList.add('correct');score++;setTimeout(()=>{index++;renderExercise()},350)}else cell.classList.add('wrong');});
}

$('#resetButton').addEventListener('click',()=>{if(confirm('Reset all saved progress on this device?')){localStorage.removeItem('tiOrdProgress');location.reload();}});

function registerWebMCP() {
  if(!document.modelContext?.registerTool) return;
  const register=(tool)=>Promise.resolve(document.modelContext.registerTool(tool)).catch(()=>{});
  register({name:'read_todays_danish_words',title:"Read today's Danish words",description:"Return today's ten Danish vocabulary words and English translations.",inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({date:todayKey,words:todaysWords.map(({da,en,type})=>({danish:da,english:en,type}))})});
  register({name:'start_vocabulary_exercise',title:'Start vocabulary exercise',description:'Open one of the visible Danish vocabulary practice modes.',inputSchema:{type:'object',properties:{mode:{type:'string',enum:['da-en','en-da','bingo']}},required:['mode'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:({mode})=>{if(!['da-en','en-da','bingo'].includes(mode))throw new Error('Invalid mode');openPractice(mode);return{opened:true,mode};}});
}

renderWords(); registerWebMCP();
