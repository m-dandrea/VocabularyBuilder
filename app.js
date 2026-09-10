const WORDS = [
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
].map(([da,en,type,sentence], id) => ({id,da,en,type,sentence}));

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
  if(mode==='sentence') return renderSentence(w);
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

function renderSentence(w) {
  const options=shuffle([w,...shuffle(practicePool.filter(x=>x.id!==w.id)).slice(0,3)]);
  $('#modeLabel').textContent=`${index+1} OF ${queue.length}`; $('#dialogTitle').textContent='Complete the sentence';
  $('#exerciseArea').innerHTML=`<div class="quiz"><p class="sentence">${w.sentence}</p><div class="sentence-options">${options.map(x=>`<button data-id="${x.id}">${clean(x.da)}</button>`).join('')}</div><div class="feedback" id="feedback"></div></div>`;
  document.querySelectorAll('.sentence-options button').forEach(btn=>btn.onclick=()=>{const ok=Number(btn.dataset.id)===w.id;if(ok)score++;$('#feedback').className=`feedback ${ok?'good':'bad'}`;$('#feedback').textContent=ok?'Correct!':`The answer is “${clean(w.da)}”.`;document.querySelectorAll('.sentence-options button').forEach(b=>b.disabled=true);setTimeout(()=>{index++;renderExercise()},700);});
}

$('#resetButton').addEventListener('click',()=>{if(confirm('Reset all saved progress on this device?')){localStorage.removeItem('tiOrdProgress');location.reload();}});

function registerWebMCP() {
  if(!document.modelContext?.registerTool) return;
  const register=(tool)=>Promise.resolve(document.modelContext.registerTool(tool)).catch(()=>{});
  register({name:'read_todays_danish_words',title:"Read today's Danish words",description:"Return today's ten Danish vocabulary words and English translations.",inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({date:todayKey,words:todaysWords.map(({da,en,type})=>({danish:da,english:en,type}))})});
  register({name:'start_vocabulary_exercise',title:'Start vocabulary exercise',description:'Open one of the visible Danish vocabulary practice modes.',inputSchema:{type:'object',properties:{mode:{type:'string',enum:['da-en','en-da','bingo','sentence']}},required:['mode'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:({mode})=>{if(!['da-en','en-da','bingo','sentence'].includes(mode))throw new Error('Invalid mode');openPractice(mode);return{opened:true,mode};}});
}

renderWords(); registerWebMCP();
