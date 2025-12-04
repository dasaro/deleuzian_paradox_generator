// Generatore di Paradossi Deleuziani
// Titolo + frase in stile Deleuze, con coppie semantiche più controllate.

const seriesEl = document.getElementById("series-label");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("paradox-text");
const btnEl = document.getElementById("generate-btn");
const cursorEl = document.getElementById("cursor");

let typingInterval = null;

function toRoman(num) {
  const romanMap = [
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" }
  ];
  let result = "";
  let n = num;
  for (const entry of romanMap) {
    while (n >= entry.value) {
      result += entry.symbol;
      n -= entry.value;
    }
  }
  return result;
}

function setRandomSeriesLabel() {
  if (!seriesEl) return;
  // Deleuze ha serie numerate, qui scegliamo un numero simbolico fra I e XXIV
  const n = 1 + Math.floor(Math.random() * 24);
  const roman = toRoman(n);
  seriesEl.textContent = `Serie di paradossi ${roman}`;
}

// Schema generale (semplificato dall'originale di Deleuze):
// "Quando dico «X», voglio dire che Y diventa più A di quanto non fosse prima.
//  Ma voglio anche dire che Y diventa più B di quanto non sia ora.
//  Senza dubbio, non è nello stesso tempo che Y sia più A e più B.
//  Ma è nello stesso tempo che lo diventa."

const paradoxes = [
  // --- Paradossi del divenire ---
  {
    title: "Il paradosso di crescere",
    quote: "«Alice cresce»",
    opening:
      "non descrivo solo il fatto che il suo corpo si allunga man mano.",
    double:
      "Dico che la stessa frase fa di Alice, rispetto a ieri, qualcuno di più grande e, rispetto a domani, qualcuno di ancora troppo piccolo.",
    final:
      "Il corpo cambia, ma è un solo enunciato che tira Alice verso il passato che ha già lasciato e verso il futuro che non ha ancora raggiunto."
  },
  {
    title: "Il paradosso di invecchiare",
    quote: "«sto invecchiando»",
    opening:
      "non registro semplicemente il passare degli anni.",
    double:
      "Dico che la stessa vita appare, rispetto a chi ero, più piena, e rispetto a chi sarò, già troppo breve.",
    final:
      "Il tempo non scorre in due direzioni, ma la frase mi tiene insieme come già troppo tardi e ancora in tempo."
  },
  {
    title: "Il paradosso del procrastinare",
    quote: "«lo faccio domani»",
    opening:
      "non sposto soltanto un'attività sul calendario.",
    double:
      "Dico che lo stesso compito esce dall'agenda di oggi ed entra, nello stesso momento, in un angolo fisso dei miei pensieri.",
    final:
      "Il domani non è ancora arrivato, ma la frase trasforma quel compito in qualcosa che continua a occupare proprio il presente che volevo sgombrare."
  },
  {
    title: "Il paradosso del rassicurare",
    quote: "«non ti preoccupare»",
    opening:
      "non cancello di colpo il motivo d'ansia.",
    double:
      "Dico che la stessa preoccupazione sembra farsi più piccola a parole e, nello stesso istante, più grande nel non‑detto.",
    final:
      "La frase vuole calmare, ma trattiene l'allarme sia come eco smorzata sia come sospetto che non osa nominare."
  },
  {
    title: "Il paradosso del mettere like",
    quote: "«metto un like»",
    opening:
      "non compio solo un gesto leggero con il pollice.",
    double:
      "Dico che lo stesso clic rende il gesto più irrilevante, perché vale un istante, e più pesante, perché verrà contato, archiviato, interpretato.",
    final:
      "Il dito sfiora lo schermo una volta sola, ma il segno resta insieme minimo nel mio vissuto e massimo nel calcolo degli altri."
  },
  {
    title: "Il paradosso del delegare",
    quote: "«te lo delego»",
    opening:
      "non mi limito a distribuire il lavoro.",
    double:
      "Dico che lo stesso problema diventa più piccolo per chi lo scarica e più grande per chi lo riceve.",
    final:
      "L'incarico si sposta di scrivania, ma è la stessa frase che alleggerisce una responsabilità mentre ne appesantisce un'altra."
  },
  {
    title: "Il paradosso del promettere",
    quote: "«te lo prometto»",
    opening:
      "non aggiungo solo una formula di cortesia.",
    double:
      "Dico che la stessa incertezza sembra ridursi, perché ha una parola a sostenerla, e crescere, perché ora porta il peso di un vincolo.",
    final:
      "La promessa non sposta il futuro, ma lo tiene sospeso fra la fiducia e il timore di non mantenerla."
  },
  {
    title: "Il paradosso del chiudere la discussione",
    quote: "«chiudiamo qui la discussione»",
    opening:
      "non sto semplicemente mettendo fine a una conversazione.",
    double:
      "Dico che lo stesso tema viene archiviato come risolto e aperto come non più discutibile.",
    final:
      "Il silenzio che segue è insieme pace e censura: la questione tace, ma non ha finito di parlare."
  },
  {
    title: "Il paradosso dell'aggiornare il profilo",
    quote: "«aggiorno il profilo»",
    opening:
      "non cambio semplicemente una foto e due righe di testo.",
    double:
      "Dico che la stessa identità si fa più riconoscibile per chi guarda e più costruita per chi la espone.",
    final:
      "L'io resta un corpo, ma lì vive come immagine che insieme chiarisce e tradisce chi la porta."
  },
  {
    title: "Il paradosso del dire «ci vediamo»",
    quote: "«ci vediamo presto»",
    opening:
      "non fisso davvero una data.",
    double:
      "Dico che lo stesso incontro si fa più vicino nell'immaginazione e più lontano nella pratica.",
    final:
      "La formula congeda e trattiene: saluta l'altro e lo tiene sospeso in un futuro che potrebbe non arrivare."
  },

  // --- Paradossi statici / logici / matematici ---
  {
    title: "Il paradosso dello zero",
    quote: "«0 non è né positivo né negativo»",
    opening:
      "non racconto la storia di un numero che attraversa lo zero.",
    double:
      "Dico che lo stesso segno vale come più grande di ogni numero negativo e più piccolo di ogni numero positivo.",
    final:
      "La cifra resta immobile, mentre la retta dei numeri si tende in due sensi opposti attorno a lei."
  },
  {
    title: "Il paradosso della somma banale",
    quote: "«2+2=4»",
    opening:
      "non descrivo un calcolo che evolve.",
    double:
      "Dico che la stessa uguaglianza appare come il risultato più ovvio e come il vincolo più rigido, che non ammette eccezioni.",
    final:
      "Il quattro non cresce né diminuisce, ma tiene il pensiero fra l'evidenza che rassicura e la necessità che non si può discutere."
  },
  {
    title: "Il paradosso dell'identità",
    quote: "«A è A»",
    opening:
      "non aggiungo nulla al simbolo che nomino.",
    double:
      "Dico che la stessa formula vale come massima ovvietà e massimo enigma: chiude ogni domanda e ne fa nascere di nuove.",
    final:
      "L'identico non si muove, ma la mente vi gira intorno fra la tautologia e la vertigine."
  },
  {
    title: "Il paradosso della tautologia",
    quote: "«se piove, allora piove»",
    opening:
      "non informo nessuno sul meteo.",
    double:
      "Dico che la stessa frase realizza il massimo della certezza e il minimo dell'informazione.",
    final:
      "Il cielo resta uguale, ma la logica vi trova insieme il suo punto più solido e più inutile."
  },
  {
    title: "Il paradosso della contraddizione formale",
    quote: "«è impossibile che P e non‑P siano vere insieme»",
    opening:
      "non descrivo due fatti incompatibili.",
    double:
      "Dico che la stessa regola respinge la contraddizione e la mantiene davanti agli occhi come esempio costante.",
    final:
      "La forma resta negativa, ma vive del caso che proibisce e di cui non smette di parlare."
  },
  {
    title: "Il paradosso del confine della città",
    quote: "«qui finisce la città»",
    opening:
      "non indico un muro che avanza o arretra.",
    double:
      "Dico che la stessa linea è ultimo limite per chi sta dentro e primo limite per chi sta fuori.",
    final:
      "Non c'è un prima e un dopo del confine: è il punto in cui interno ed esterno si scambiano di posto senza muoversi."
  },
  {
    title: "Il paradosso della porta socchiusa",
    quote: "«la porta è socchiusa»",
    opening:
      "non racconto un movimento di apertura o chiusura.",
    double:
      "Dico che la stessa fessura è ancora abbastanza chiusa da non lasciar passare nessuno e già abbastanza aperta da lasciar passare lo sguardo.",
    final:
      "La posizione resta ferma, ma tiene insieme il sì e il no in un unico varco incerto."
  },
  {
    title: "Il paradosso di zero gradi",
    quote: "«a zero gradi l'acqua congela»",
    opening:
      "non seguo il destino di una goccia che cambia stato.",
    double:
      "Dico che la stessa temperatura è ancora liquida per chi sta un soffio sopra e già solida per chi sta un soffio sotto.",
    final:
      "La cifra è fissa, ma due stati incompatibili vengono a toccarsi esattamente lì."
  },
  {
    title: "Il paradosso della soglia di sufficienza",
    quote: "«18 è la sufficienza»",
    opening:
      "non narro la storia di un voto che sale.",
    double:
      "Dico che lo stesso numero è ancora insufficiente per chi resta sotto e già sufficiente per chi lo raggiunge.",
    final:
      "La scala resta la stessa, ma quel gradino separa di colpo il non‑ammesso dall'ammesso."
  },
  {
    title: "Il paradosso dell'equatore",
    quote: "«l'equatore divide i due emisferi»",
    opening:
      "non immagino una linea che migra verso nord o verso sud.",
    double:
      "Dico che lo stesso cerchio è massimo sud del nord e massimo nord del sud.",
    final:
      "La Terra gira, ma l'equatore la costringe a essere sempre sopra e sotto se stessa nello stesso tempo."
  },
  {
    title: "Il paradosso del centro del cerchio",
    quote: "«questo è il centro del cerchio»",
    opening:
      "non penso a un punto che si sposta verso il bordo.",
    double:
      "Dico che lo stesso punto è il più lontano da ogni punto della circonferenza e, per questo, equamente vicino a tutti.",
    final:
      "Non si muove, ma distribuisce tutte le distanze come se partissero da lui."
  },
  {
    title: "Il paradosso della pagina bianca",
    quote: "«la pagina è ancora bianca»",
    opening:
      "non constato solo che non c'è inchiostro.",
    double:
      "Dico che lo stesso spazio è il più vuoto e il più pieno: non contiene nulla e può contenere tutto.",
    final:
      "Il foglio resta immobile, ma su di lui si affollano in anticipo tutti i testi possibili."
  },
  {
    title: "Il paradosso del silenzio",
    quote: "«qui c'è silenzio»",
    opening:
      "non registro soltanto l'assenza di suono.",
    double:
      "Dico che lo stesso silenzio è massima pace per chi lo cerca e massima tensione per chi lo subisce.",
    final:
      "L'aria resta ferma, ma raddoppia sia la quiete sia l'angoscia."
  },
  // --- Paradossi pragmatici / normativi ---
  {
    title: "Il paradosso del «è solo un gioco»",
    quote: "«è solo un gioco»",
    opening:
      "non sto semplicemente sminuendo quello che accade.",
    double:
      "Dico che la stessa attività viene dichiarata meno seria di tutto il resto e, nello stesso istante, usata per allenare le stesse regole di vittoria e sconfitta.",
    final:
      "Il gioco è detto «solo» gioco, ma diventa il luogo in cui si impara come si vince e come si perde anche fuori dal campo."
  },
  {
    title: "Il paradosso dell'«è solo un'opinione personale»",
    quote: "«è solo un'opinione personale»",
    opening:
      "non sto soltanto facendo un passo indietro rispetto alla verità.",
    double:
      "Dico che lo stesso giudizio si presenta come più debole, perché non pretende oggettività, e più forte, perché non accetta di essere discusso al di fuori di chi lo pronuncia.",
    final:
      "La formula attenua il tono, ma blinda il contenuto: sembra ritirarsi e intanto si rende intoccabile."
  },
  {
    title: "Il paradosso del «non prenderla sul personale»",
    quote: "«non prenderla sul personale»",
    opening:
      "non sto davvero togliendo la tua persona dal centro della frase.",
    double:
      "Dico che lo stesso rimprovero si propone come generale, valido per chiunque, e nello stesso momento colpisce proprio te, qui e ora, come il vero bersaglio.",
    final:
      "La formula pretende di depersonalizzare, ma serve soprattutto a far passare qualcosa che è già arrivato troppo vicino."
  },
  {
    title: "Il paradosso del «te lo dico per il tuo bene»",
    quote: "«te lo dico per il tuo bene»",
    opening:
      "non sto solo chiarendo le mie intenzioni.",
    double:
      "Dico che la stessa frase si offre come cura per te e come garanzia per me, che posso così spingere di più senza sembrare aggressivo.",
    final:
      "Il bene dell'altro viene convocato come motivo, ma è anche lo schermo dietro cui si nasconde il mio desiderio di orientare le sue scelte."
  },
  {
    title: "Il paradosso dell'«è solo teoria»",
    quote: "«è solo teoria»",
    opening:
      "non sto separando semplicemente il pensiero dalla pratica.",
    double:
      "Dico che lo stesso insieme di idee viene messo da parte come irrilevante e usato in silenzio come griglia per giudicare ciò che funziona.",
    final:
      "La teoria è dichiarata «solo» teoria, ma resta il metro invisibile con cui si misurano i fatti."
  }
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildText(p) {
  return `Quando dico ${p.quote}, ${p.opening} ` +
         `${p.double} ` +
         `${p.final}`;
}

// Effetto typewriter
function typeText(text) {
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  textEl.textContent = "";
  cursorEl.classList.add("visible");

  let i = 0;
  const speed = 18 + Math.random() * 10;

  typingInterval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(typingInterval);
      typingInterval = null;
      setTimeout(() => cursorEl.classList.remove("visible"), 900);
      return;
    }
    textEl.textContent += text.charAt(i);
    i += 1;
  }, speed);
}

function generateParadox() {
  const p = randomItem(paradoxes);
  titleEl.textContent = p.title;
  const sentence = buildText(p);
  typeText(sentence);
}

btnEl.addEventListener("click", generateParadox);
window.addEventListener("DOMContentLoaded", () => {
  setRandomSeriesLabel();
  generateParadox();
});
