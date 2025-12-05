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
    act: "il puro divenire",
    opening:
      "non descrivo solo il fatto che il suo corpo si allunga man mano.",
    double:
      "Dico che, rispetto a ieri, Alice è già più grande, e rispetto a domani è ancora troppo piccola.",
    final:
      "Senza dubbio, non è nello stesso momento che Alice sia più grande e più piccola. Ma è nello stesso enunciato «Alice cresce» che lo diventa: più grande di quanto fosse, più piccola di quanto sarà."
  },
  {
    title: "Il paradosso di invecchiare",
    quote: "«sto invecchiando»",
    act: "il puro divenire",
    opening:
      "non registro semplicemente il passare degli anni.",
    double:
      "Dico che la stessa vita appare, rispetto a chi ero, più piena, e rispetto a chi sarò, già troppo breve.",
    final:
      "Non è nello stesso istante che una vita sia compiuta e mancante. Ma è nella stessa frase «sto invecchiando» che diventa insieme troppo lunga per ciò che contiene e troppo breve per ciò che promette ancora."
  },
  {
    title: "Il paradosso del procrastinare",
    quote: "«lo faccio domani»",
    act: "l'economia del tempo",
    opening:
      "non sposto soltanto un'attività sul calendario.",
    double:
      "Dico che lo stesso compito esce dall'agenda di oggi ed entra, nello stesso momento, in un angolo fisso dei miei pensieri.",
    final:
      "Non è nello stesso oggi che il compito sia assente e presente. Ma è nello stesso «lo faccio domani» che diventa insieme rinviato nel tempo e installato come presenza ostinata nell'oggi che volevo liberare."
  },
  {
    title: "Il paradosso del rassicurare",
    quote: "«non ti preoccupare»",
    act: "l'economia dell'ansia",
    opening:
      "non cancello di colpo il motivo d'ansia.",
    double:
      "Dico che la stessa preoccupazione sembra farsi più piccola a parole e, nello stesso istante, più grande nel non-detto.",
    final:
      "Non è nello stesso punto dell'animo che l'ansia si plachi e si intensifichi. Ma è nella stessa formula «non ti preoccupare» che diventa insieme attenuata in superficie e rilanciata in profondità."
  },
  {
    title: "Il paradosso del mettere like",
    quote: "«metto un like»",
    act: "la politica dell'immagine",
    opening:
      "non compio solo un gesto leggero con il pollice.",
    double:
      "Dico che lo stesso clic rende il gesto più irrilevante, perché vale un istante, e più pesante, perché verrà contato, archiviato, interpretato.",
    final:
      "Non è nello stesso sguardo che quel segno sia insignificante e decisivo. Ma è nello stesso like che diventa insieme minimo nel mio gesto e massimo nel dispositivo che lo registra."
  },
  {
    title: "Il paradosso del delegare",
    quote: "«te lo delego»",
    act: "la politica della responsabilità",
    opening:
      "non mi limito a distribuire il lavoro.",
    double:
      "Dico che lo stesso problema diventa più piccolo per chi lo scarica e più grande per chi lo riceve.",
    final:
      "Non è sulla stessa scrivania che un carico sia alleggerito e appesantito. Ma è nella stessa frase «te lo delego» che un unico compito diventa insieme sollievo per uno e aggravio per l'altro."
  },
  {
    title: "Il paradosso del promettere",
    quote: "«te lo prometto»",
    act: "la politica della responsabilità",
    opening:
      "non aggiungo solo una formula di cortesia.",
    double:
      "Dico che la stessa incertezza sembra ridursi, perché ha una parola a sostenerla, e crescere, perché ora porta il peso di un vincolo.",
    final:
      "Non è nello stesso futuro che una promessa sia più sicura e più minacciata. Ma è nello stesso «te lo prometto» che il futuro diventa insieme garantito e carico del rischio di essere mancato."
  },
  {
    title: "Il paradosso del chiudere la discussione",
    quote: "«chiudiamo qui la discussione»",
    act: "la politica della parola",
    opening:
      "non sto semplicemente mettendo fine a una conversazione.",
    double:
      "Dico che lo stesso tema viene archiviato come risolto e aperto come non più discutibile.",
    final:
      "Non è nello stesso scambio che una questione sia conclusa e proibita. Ma è nello stesso «chiudiamo qui» che diventa insieme risposta definitiva e porta sbarrata a ogni replica."
  },
  {
    title: "Il paradosso dell'aggiornare il profilo",
    quote: "«aggiorno il profilo»",
    act: "la politica dell'identità",
    opening:
      "non cambio semplicemente una foto e due righe di testo.",
    double:
      "Dico che la stessa identità si fa più riconoscibile per chi guarda e più costruita per chi la espone.",
    final:
      "Non è nello stesso sguardo che un volto sia più autentico e più artificiale. Ma è nello stesso aggiornamento che l'io diventa insieme più chiaro come immagine e più distante da chi lo porta."
  },
  {
    title: "Il paradosso del dire «ci vediamo»",
    quote: "«ci vediamo presto»",
    act: "l'economia del tempo",
    opening:
      "non fisso davvero una data.",
    double:
      "Dico che lo stesso incontro si fa più vicino nell'immaginazione e più lontano nella pratica.",
    final:
      "Non è nello stesso calendario che un appuntamento sia deciso e indefinito. Ma è nello stesso «ci vediamo presto» che diventa insieme promessa di prossimità e licenza di rimandare all'infinito."
  },

  // --- Paradossi statici / logici / matematici ---
  {
    title: "Il paradosso dello zero",
    quote: "«0 non è né positivo né negativo»",
    act: "la logica del limite",
    opening:
      "non racconto la storia di un numero che attraversa lo zero.",
    double:
      "Dico che lo stesso segno vale come più grande di ogni numero negativo e più piccolo di ogni numero positivo.",
    final:
      "Non è nello stesso confronto che uno zero sia massimo tra i negativi e minimo tra i positivi. Ma è nello stesso zero che diventa insieme frontiera estrema di una serie e frontiera estrema dell'altra."
  },
  {
    title: "Il paradosso della somma banale",
    quote: "«2+2=4»",
    act: "il lavoro della logica",
    opening:
      "non descrivo un calcolo che evolve.",
    double:
      "Dico che la stessa uguaglianza appare come il risultato più ovvio e come il vincolo più rigido, che non ammette eccezioni.",
    final:
      "Non è nello stesso atto mentale che un'equazione sia tranquillizzante e oppressiva. Ma è nello stesso «2+2=4» che diventa insieme evidenza che consola e necessità che non lascia scampo."
  },
  {
    title: "Il paradosso dell'identità",
    quote: "«A è A»",
    act: "il lavoro della logica",
    opening:
      "non aggiungo nulla al simbolo che nomino.",
    double:
      "Dico che la stessa formula vale come massima ovvietà e massimo enigma: chiude ogni domanda e ne fa nascere di nuove.",
    final:
      "Non è nello stesso enunciato che l'identico sia il più semplice e il più oscuro. Ma è nello stesso «A è A» che diventa insieme tautologia scolastica e abisso speculativo."
  },
  {
    title: "Il paradosso della tautologia",
    quote: "«se piove, allora piove»",
    act: "il lavoro della logica",
    opening:
      "non informo nessuno sul meteo.",
    double:
      "Dico che la stessa frase realizza il massimo della certezza e il minimo dell'informazione.",
    final:
      "Non è nello stesso discorso che un enunciato sia completamente sicuro e completamente vuoto. Ma è nella stessa tautologia che diventa insieme fondamento della logica e caricatura del dire."
  },
  {
    title: "Il paradosso della contraddizione formale",
    quote: "«è impossibile che P e non-P siano vere insieme»",
    act: "il lavoro della logica",
    opening:
      "non descrivo due fatti incompatibili.",
    double:
      "Dico che la stessa regola respinge la contraddizione e la mantiene davanti agli occhi come esempio costante.",
    final:
      "Non è nella stessa situazione che P e non-P siano ammesse e vietate. Ma è nella stessa legge che le proibisce che la contraddizione diventa insieme caso limite espulso e figura centrale del pensiero."
  },
  {
    title: "Il paradosso del confine della città",
    quote: "«qui finisce la città»",
    act: "la logica del limite",
    opening:
      "non indico un muro che avanza o arretra.",
    double:
      "Dico che la stessa linea è ultimo limite per chi sta dentro e primo limite per chi sta fuori.",
    final:
      "Non è nello stesso passo che qualcuno entri e qualcuno esca. Ma è nello stesso confine che dentro e fuori diventano insieme ciò che si lascia e ciò in cui si arriva."
  },
  {
    title: "Il paradosso della porta socchiusa",
    quote: "«la porta è socchiusa»",
    act: "la logica del limite",
    opening:
      "non racconto un movimento di apertura o chiusura.",
    double:
      "Dico che la stessa fessura è ancora abbastanza chiusa da non lasciar passare nessuno e già abbastanza aperta da lasciar passare lo sguardo.",
    final:
      "Non è nella stessa posizione che una porta sia chiusa e aperta. Ma è nello stesso spiraglio che diventa insieme barriera per i corpi e invito per gli occhi."
  },
  {
    title: "Il paradosso di zero gradi",
    quote: "«a zero gradi l'acqua congela»",
    act: "la logica del limite",
    opening:
      "non seguo il destino di una goccia che cambia stato.",
    double:
      "Dico che la stessa temperatura è ancora liquida per chi sta un soffio sopra e già solida per chi sta un soffio sotto.",
    final:
      "Non è nello stesso campione che l'acqua sia ghiaccio e acqua. Ma è nello stesso zero che la materia diventa insieme ultimo grado del liquido e primo del solido."
  },
  {
    title: "Il paradosso della soglia di sufficienza",
    quote: "«18 è la sufficienza»",
    act: "la logica del limite",
    opening:
      "non narro la storia di un voto che sale.",
    double:
      "Dico che lo stesso numero è ancora insufficiente per chi resta sotto e già sufficiente per chi lo raggiunge.",
    final:
      "Non è nello stesso compito che uno studente sia respinto e ammesso. Ma è nello stesso 18 che la valutazione diventa insieme ultimo grado dell'insufficiente e primo del riuscito."
  },
  {
    title: "Il paradosso dell'equatore",
    quote: "«l'equatore divide i due emisferi»",
    act: "la logica del limite",
    opening:
      "non immagino una linea che migra verso nord o verso sud.",
    double:
      "Dico che lo stesso cerchio è massimo sud del nord e massimo nord del sud.",
    final:
      "Non è nello stesso punto della Terra che si abiti l'emisfero nord e l'emisfero sud. Ma è nello stesso equatore che il pianeta diventa insieme bordo estremo del nord e bordo estremo del sud."
  },
  {
    title: "Il paradosso del centro del cerchio",
    quote: "«questo è il centro del cerchio»",
    act: "la logica del limite",
    opening:
      "non penso a un punto che si sposta verso il bordo.",
    double:
      "Dico che lo stesso punto è il più lontano da ogni punto della circonferenza e, per questo, equamente vicino a tutti.",
    final:
      "Non è nella stessa distanza che un luogo sia massimo e minimo. Ma è nello stesso centro che ogni raggio diventa insieme distanza uguale e distanza irriducibile da tutti i bordi."
  },
  {
    title: "Il paradosso della pagina bianca",
    quote: "«la pagina è ancora bianca»",
    act: "il darsi del fenomeno",
    opening:
      "non constato solo che non c'è inchiostro.",
    double:
      "Dico che lo stesso spazio è il più vuoto e il più pieno: non contiene nulla e può contenere tutto.",
    final:
      "Non è nello stesso testo che una pagina sia priva di segni e carica di possibilità. Ma è nella stessa pagina bianca che diventa insieme mancanza assoluta e eccedenza di senso in attesa."
  },
  {
    title: "Il paradosso del silenzio",
    quote: "«qui c'è silenzio»",
    act: "il darsi del fenomeno",
    opening:
      "non registro soltanto l'assenza di suono.",
    double:
      "Dico che lo stesso silenzio è massima pace per chi lo cerca e massima tensione per chi lo subisce.",
    final:
      "Non è nello stesso ascolto che il silenzio sia riposo e minaccia. Ma è nello stesso tacere che diventa insieme spazio di quiete e luogo in cui ogni rumore possibile fa paura."
  },

  // --- Paradossi pragmatici / normativi ---
  {
    title: "Il paradosso del «è solo un gioco»",
    quote: "«è solo un gioco»",
    act: "il lavoro della norma",
    opening:
      "non sto semplicemente sminuendo quello che accade.",
    double:
      "Dico che la stessa attività viene dichiarata meno seria di tutto il resto e, nello stesso istante, usata per allenare le stesse regole di vittoria e sconfitta.",
    final:
      "Non è nello stesso campo che qualcosa sia finto e formi davvero. Ma è nello stesso «solo un gioco» che un gesto diventa insieme irrilevante a parole e decisivo nel modo in cui impariamo a vincere e a perdere."
  },
  {
    title: "Il paradosso dell'«è solo un'opinione personale»",
    quote: "«è solo un'opinione personale»",
    act: "il lavoro della norma",
    opening:
      "non sto soltanto facendo un passo indietro rispetto alla verità.",
    double:
      "Dico che lo stesso giudizio si presenta come più debole, perché non pretende oggettività, e più forte, perché non accetta di essere discusso al di fuori di chi lo pronuncia.",
    final:
      "Non è nello stesso dibattito che un'idea sia dimessa e intoccabile. Ma è nello stesso «è solo personale» che diventa insieme auto-limitata e sottratta al confronto."
  },
  {
    title: "Il paradosso del «non prenderla sul personale»",
    quote: "«non prenderla sul personale»",
    act: "il lavoro della norma",
    opening:
      "non sto davvero togliendo la tua persona dal centro della frase.",
    double:
      "Dico che lo stesso rimprovero si propone come generale, valido per chiunque, e nello stesso momento colpisce proprio te, qui e ora, come il vero bersaglio.",
    final:
      "Non è nello stesso colpo che una parola sia neutra e mirata. Ma è nello stesso «non prenderla sul personale» che diventa insieme universalizzata nel discorso e cucita addosso a chi la riceve."
  },
  {
    title: "Il paradosso del «te lo dico per il tuo bene»",
    quote: "«te lo dico per il tuo bene»",
    act: "il lavoro della norma",
    opening:
      "non sto solo chiarendo le mie intenzioni.",
    double:
      "Dico che la stessa frase si offre come cura per te e come garanzia per me, che posso così spingere di più senza sembrare aggressivo.",
    final:
      "Non è nello stesso consiglio che il bene dell'altro sia criterio e scudo. Ma è nello stesso «per il tuo bene» che diventa insieme misura di ciò che dovresti volere e copertura di ciò che voglio io."
  },
  {
    title: "Il paradosso dell'«è solo teoria»",
    quote: "«è solo teoria»",
    act: "il lavoro della norma",
    opening:
      "non sto separando semplicemente il pensiero dalla pratica.",
    double:
      "Dico che lo stesso insieme di idee viene messo da parte come irrilevante e usato in silenzio come griglia per giudicare ciò che funziona.",
    final:
      "Non è nello stesso gesto che la teoria sia accantonata e decisiva. Ma è nello stesso «è solo teoria» che diventa insieme ciò che si finge di non seguire e ciò che in realtà orienta ciò che si fa."
  }

];

// --- Variante combinatoria (sperimentale) ---
// Qui definiamo domini concettuali con:
// - atto (act) deleuziano astratto
// - possibili citazioni (quote)
// - un soggetto base (subject)
// - varianti di opening / double / final, con segnaposto {subject}, {A}, {B}, {scope}, {carrier}.

const combinatorialDomains = [
  {
    id: "tempo",
    label: "del tempo",
    act: "l'economia del tempo",
    quotes: ["«lo faccio domani»", "«ci vediamo presto»"],
    subject: "compito",
    scope: "oggi",
    carrier: "rinvio",
    pairs: [
      {
        A: "più lontano dal mio oggi",
        B: "più vicino come pensiero fisso"
      },
      {
        A: "meno presente nella mia agenda",
        B: "più presente nella mia testa"
      }
    ],
    openings: [
      "non sposto soltanto un'attività sul calendario.",
      "non sto semplicemente distribuendo il tempo su un'altra giornata."
    ],
    doubles: [
      "Dico che lo stesso {subject} si allontana dall'oggi e si installa, nello stesso gesto, nel pensiero che volevo liberare.",
      "Dico che lo stesso {subject} esce dalla lista delle cose da fare e rientra subito come pensiero che non riesco a scacciare."
    ],
    finals: [
      "Non è nello stesso {scope} che {subject} sia assente e presente. Ma è nello stesso {carrier} che diventa insieme lontano nel tempo e vicino come ossessione.",
      "Non è nello stesso giorno che {subject} sia rimandato e compiuto. Ma è nello stesso gesto che lo posticipa che diventa insieme fuori dall'agenda e dentro la mente."
    ]
  },
  {
    id: "limite",
    label: "del limite",
    act: "la logica del limite",
    quotes: ["«qui finisce la città»", "«18 è la sufficienza»"],
    subject: "linea",
    scope: "spazio",
    carrier: "confine",
    pairs: [
      {
        A: "ultimo bordo per chi sta dentro",
        B: "primo bordo per chi sta fuori"
      },
      {
        A: "ultimo gradino dell'insufficienza",
        B: "primo gradino del riuscito"
      }
    ],
    openings: [
      "non indico semplicemente un prima e un dopo.",
      "non descrivo solo il punto in cui qualcosa termina."
    ],
    doubles: [
      "Dico che la stessa {subject} è, per chi arretra, estremo limite di ciò che perde, e per chi avanza, primo passo di ciò che conquista.",
      "Dico che la stessa {subject} segna, per alcuni, ciò che non hanno raggiunto e, per altri, ciò che li separa da chi resta indietro."
    ],
    finals: [
      "Non è nello stesso gesto che si esca e si entri. Ma è nello stesso {carrier} che dentro e fuori diventano insieme ciò che si lascia e ciò in cui si arriva.",
      "Non è nello stesso atto che un voto respinga e ammetta. Ma è nello stesso limite che diventa insieme cifra di esclusione e di appartenenza."
    ]
  },
  {
    id: "norma",
    label: "della norma",
    act: "il lavoro della norma",
    quotes: ["«è solo un gioco»", "«è solo teoria»"],
    subject: "stesso gesto",
    scope: "discorso",
    carrier: "formula che lo accompagna",
    pairs: [
      {
        A: "meno serio di tutto il resto",
        B: "più formativo di quanto si ammetta"
      },
      {
        A: "messo da parte come irrilevante",
        B: "usato in silenzio come misura di ciò che conta"
      }
    ],
    openings: [
      "non sto semplicemente togliendo peso a ciò che accade.",
      "non sto soltanto mettendo tra parentesi ciò che viene detto o fatto."
    ],
    doubles: [
      "Dico che lo stesso {subject} è dichiarato meno importante degli altri e, nello stesso momento, diventa il modello con cui giudichiamo il resto.",
      "Dico che lo stesso {subject} viene spinto ai margini a parole e riportato al centro nel modo in cui valutiamo, senza dirlo."
    ],
    finals: [
      "Non è nello stesso {scope} che qualcosa sia minimo e decisivo. Ma è nella stessa {carrier} che diventa insieme ciò che si finge di non contare e ciò che in realtà pesa di più.",
      "Non è nello stesso commento che un gesto sia archiviato e normato. Ma è nella stessa etichetta di «solo» qualcosa che diventa insieme innocuo e vincolante."
    ]
  }
];

// Scegliamo elementi a caso all'interno di un dominio e costruiamo un paradosso combinatorio.
function randomDomainItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Costruisce un paradosso combinatorio in stile analogo a quelli fissi.
 * Restituisce un oggetto con { title, quote, act, opening, double, final }.
 */
function buildCombinatorialParadox() {
  const domain = randomDomainItem(combinatorialDomains);
  const quote = randomDomainItem(domain.quotes);
  const pair = randomDomainItem(domain.pairs);
  const opening = randomDomainItem(domain.openings);
  let double = randomDomainItem(domain.doubles);
  let final = randomDomainItem(domain.finals);

  // Sostituzione segnaposto basilare
  const subject = domain.subject;
  const replacements = {
    "{subject}": subject,
    "{A}": pair.A,
    "{B}": pair.B,
    "{scope}": domain.scope,
    "{carrier}": domain.carrier
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    double = double.split(placeholder).join(value);
    final = final.split(placeholder).join(value);
  }

  return {
    title: `Un paradosso ${domain.label}`,
    quote,
    act: domain.act,
    opening,
    double,
    final
  };
}

// Helper che produce direttamente il testo completo combinatorio (come buildText)
function buildCombinatorialText() {
  const p = buildCombinatorialParadox();
  const base = `Quando dico ${p.quote}, ${p.opening} ${p.double} ${p.final}`;
  const coda =
    ` In questo doppio tirare, dove un solo punto appartiene a due serie che divergono e tuttavia si richiamano, è proprio ${p.act} che si mostra paradossale, come un evento che non si lascia rinchiudere in una sola direzione del senso e tiene insieme, in una sola volta, le sue due spinte opposte.`;
  return { p, text: base + coda };
}

// NOTA: per tenere separata la variante combinatoria da quella fissa,
// lasciamo generateParadox() invariata. Per provare la variante
// combinatoria da console:
//   const r = buildCombinatorialText();
//   titleEl.textContent = r.p.title;
//   typeText(r.text);

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildText(p) {
  const base = `Quando dico ${p.quote}, ${p.opening} ` +
               `${p.double} ` +
               `${p.final}`;
  const coda =
    ` In questo doppio tirare, dove un solo punto appartiene a due serie che divergono e tuttavia si richiamano, è proprio ${p.act} che si mostra paradossale, come un evento che non si lascia rinchiudere in una sola direzione del senso e tiene insieme, in una sola volta, le sue due spinte opposte.`;
  return base + coda;
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
