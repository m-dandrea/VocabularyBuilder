// Dictionary data layer: gives every vocabulary entry a learning level.
const Dictionary = (() => {
  const easyWords = new Set(`at være,at have,at gøre,at sige,at gå,at komme,at se,at vide,at spise,at drikke,at bo,at arbejde,at tale,at forstå,at købe,at hjælpe,en dag,en uge,et år,en ven,en familie,et hus,en by,et sted,mad,vand,kaffe,penge,stor,lille,god,dårlig,ny,gammel,smuk,nem,svær,glad,træt,varm,kold,nu,her,der,altid,aldrig,ofte,måske,meget,også,hjem,i dag,i morgen,i går,ja,nej,tak,undskyld,hej,farvel,mor,far,søster,bror,barn,mand,kvinde,pige,dreng,bil,cykel,bus,tog,brød,smør,ost,mælk,øl,vin,te,æg,kød,fisk,rød,blå,grøn,gul,sort,hvid,grå,brun`.split(','));
  const advancedWords = new Set(`at lære fra sig,at beskæftige sig,at sammenligne,at opholde sig,at tage en slurk,ingen årsag,god fornøjelse,held og lykke,ved siden af,i øjeblikket,selvfølgelig,anderledes,tidligere,hvor meget,hvor mange`.split(','));
  const classify = (word) => {
    if (advancedWords.has(word.da) || word.da.length > 16) return 'advanced';
    if (easyWords.has(word.da) || word.type === 'number' || word.id < 55) return 'easy';
    return 'medium';
  };
  return { levels:['easy','medium','advanced'], build:(words) => words.map((word) => ({...word, difficulty:classify(word)})) };
})();
