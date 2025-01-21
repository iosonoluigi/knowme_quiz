document.addEventListener("DOMContentLoaded", () => {
    /* 
       1) CREATE THE BUBBLES for the background
       - Doubling speed from 25s to 12s
       - Increasing blur from 25px to 45px
    */
    const bubbleContainer = document.getElementById("bubbleContainer");
    const totalBubbles = 15; 
    const gradientColors = [
      "linear-gradient(120deg, #ff9a9e, #fad0c4)",
      "linear-gradient(120deg, #a1c4fd, #c2e9fb)",
      "linear-gradient(120deg, #84fab0, #8fd3f4)",
      "linear-gradient(120deg, #e0c3fc, #8ec5fc)",
      "linear-gradient(120deg, #f093fb, #f5576c)",
    ];
  
    for (let i = 0; i < totalBubbles; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      // random gradient
      const randomGrad =
        gradientColors[Math.floor(Math.random() * gradientColors.length)];
      bubble.style.background = randomGrad;
  
      // random horizontal position
      const randomLeft = Math.floor(Math.random() * 100);
      bubble.style.left = `${randomLeft}vw`;
  
      // random animation delay so they don't all start uniformly
      const randomDelay = Math.random() * 10;
      bubble.style.animationDelay = `${randomDelay}s`;
  
      bubbleContainer.appendChild(bubble);
    }
  
    /* 
       2) QUIZ FUNCTIONALITY (same as original with the updated "remove start hint" on start)
    */
    const categorie = {
      LINK: { 
        colore: ["#53BFF9", "#EBD871"], 
        descrizione: "Sei quello che unisce tutto: senza di te, manca sempre qualcosa.", 
        emoji: "🔮"
      },
      GLOW: { 
        colore: ["#9A98E1", "#C7FDCC"], 
        descrizione: "Illumini le situazioni senza nemmeno provarci.", 
        emoji: "🎇"
      },
      ARC: { 
        colore: ["#287379", "#C7FDCC"], 
        descrizione: "Per te ogni viaggio è una storia da raccontare, anche se ci sono un sacco di curve.", 
        emoji: "🌈"
      },
      SPARK: { 
        colore: ["#287379", "#F9534D"], 
        descrizione: "Le tue idee sono fuochi d’artificio: arrivano e boom, tutto cambia.", 
        emoji: "⚡"
      },
      HALO: { 
        colore: ["#F4DA6A", "#C5F9CC"], 
        descrizione: "Hai quella calma che tutti vorrebbero, tipo zen ma con stile.", 
        emoji: "😇"
      },
      BURST: { 
        colore: ["#F4DA6A", "#F9534D"], 
        descrizione: "Sei pura energia, sempre pronto a fare la differenza.", 
        emoji: "💥"
      },
      SHINE: { 
        colore: ["#E6E6FA", "#F4DA6A"], 
        descrizione: "Porti positività senza filtri, e questo è il tuo superpotere.", 
        emoji: "🤩"
      },
      FLOW: { 
        colore: ["#9A98E1", "#C7FDCC"], 
        descrizione: "Con te, le cose scorrono e basta.", 
        emoji: "🌊"
      },
      PULSE: { 
        colore: ["#F890C5", "#287379"], 
        descrizione: "Hai un ritmo che dà la carica a chiunque ti stia intorno.", 
        emoji: "🔥"
      },
      SPIRE: { 
        colore: ["#4DBEFF", "#F890C5"], 
        descrizione: "Per te, l’unico limite è il cielo, e forse nemmeno quello.", 
        emoji: "🚀"
      },
      ROOT: { 
        colore: ["#E6E6FA", "#287379"], 
        descrizione: "Hai radici profonde, ma non smetti mai di crescere.", 
        emoji: "🌳"
      },
      AETHER: { 
        colore: ["#F4DA6A", "#F890C5"], 
        descrizione: "Vedi cose che gli altri nemmeno immaginano: sei un visionario.", 
        emoji: "🗿"
      },
    };
  
    const domande = {
      LINK: [
        "Ti piace collaborare con gli altri?",
        "Ti senti a tuo agio lavorando in gruppo?",
        "Trovi facilmente modi per connetterti con chiunque?",
        "Apprezzi il valore di relazioni durature?",
      ],
      GLOW: [
        "Ti senti in armonia con te stesso/a?",
        "Trovi facile ispirare chi ti circonda?",
        "Credi che la positività sia contagiosa?",
        "Cerchi spesso serenità e equilibrio nella vita?",
      ],
      ARC: [
        "Ti piace combinare idee diverse in una soluzione unica?",
        "Sei abile nel trovare punti in comune con gli altri?",
        "Apprezzi le opportunità di crescita personale?",
        "Vedi le sfide come occasioni per imparare?",
      ],
      SPARK: [
        "Ti senti spesso pieno/a di idee nuove?",
        "Ami avviare nuovi progetti creativi?",
        "Trovi soluzioni innovative ai problemi?",
        "Hai il talento di motivare gli altri con il tuo entusiasmo?",
      ],
      HALO: [
        "Ti prendi cura del benessere delle persone intorno a te?",
        "Le persone si rivolgono a te per un consiglio?",
        "Trovi gratificante proteggere chi ami?",
        "Cerchi di mantenere l’armonia in ogni situazione?",
      ],
      BURST: [
        "Ti senti energico/a e determinato/a nella vita quotidiana?",
        "Ti piace agire rapidamente per ottenere risultati?",
        "Ami affrontare nuove sfide con coraggio?",
        "Trovi stimolante superare i tuoi limiti personali?",
      ],
      SHINE: [
        "Cerchi di essere autentico/a in ogni circostanza?",
        "Ti senti un'ispirazione per gli altri?",
        "Ti piace portare equilibrio e pace?",
        "Le persone si sentono a loro agio intorno a te?",
      ],
      FLOW: [
        "Ti senti sereno/a quando segui il flusso delle cose?",
        "Trovi soddisfazione nel lavorare in modo spontaneo?",
        "Ti piace trovare un equilibrio tra creatività e logica?",
        "Ti senti connesso/a al ritmo della natura?",
      ],
      PULSE: [
        "Senti una forte energia nel tuo modo di vivere?",
        "Ti piace il ritmo intenso della vita?",
        "Trovi motivazione vedendo l’impatto delle tue azioni?",
        "Credi che la passione guidi le tue scelte?",
      ],
      SPIRE: [
        "Sei guidato/a da una forte ambizione?",
        "Ti piace puntare in alto e migliorarti continuamente?",
        "Ti senti gratificato/a raggiungendo nuovi traguardi?",
        "Trovi motivazione nei tuoi obiettivi personali?",
      ],
      ROOT: [
        "Trovi conforto nel legame con le tue radici?",
        "Ti senti stabile e radicato/a nella tua vita?",
        "Credi che la tua forza venga dalle tue fondamenta?",
        "Ami onorare tradizioni e origini?",
      ],
      AETHER: [
        "Credi che ci sia qualcosa di più grande che ci connette tutti?",
        "Ti senti attratto/a da pensieri profondi e filosofici?",
        "Trovi ispirazione nell’intangibile?",
        "Ami esplorare concetti spirituali e mistici?",
      ],
    };
  
    const maxQuestions = 20;
    let currentQuestionIndex = 0;
    const auraPoints = {};
    let quizDomande = [];
  
    // DOM references
    const titleElement = document.querySelector("h1");
    const questionElement = document.querySelector(".question");
    const startHint = document.getElementById("startHint");
    const startButton = document.getElementById("startButton");
    const quizButtons = document.getElementById("quizButtons");
    const moltoButton = document.getElementById("moltoButton");
    const abbastanzaButton = document.getElementById("abbastanzaButton");
    const pocoButton = document.getElementById("pocoButton");
  
    const resultDiv = document.getElementById("result");
    const resultText = document.getElementById("resultText");
    const auraImage = document.getElementById("auraImage");
    const avantiButton = document.getElementById("homeButton");
  
    // Final message div + Instagram button
    const finalMessageDiv = document.getElementById("finalMessage");
    const instagramButton = document.getElementById("instagramButton");
  
    // Initialize aura points
    Object.keys(categorie).forEach((key) => {
      auraPoints[key] = 0;
    });
  
    // Quiz logic
    function generateQuestion() {
      if (currentQuestionIndex >= maxQuestions || currentQuestionIndex >= quizDomande.length) {
        showResult();
        return;
      }
      const currentQuestion = quizDomande[currentQuestionIndex];
      const currentAura = currentQuestion.aura;
      const emoji = categorie[currentAura].emoji || "❓";
  
      questionElement.textContent = `${currentQuestion.question} ${emoji}`;
    }
  
    function calculateDominantAura() {
      // sort descending by score
      const [winnerAura] = Object.entries(auraPoints).sort(
        ([, scoreA], [, scoreB]) => scoreB - scoreA
      );
      return winnerAura[0];
    }
  
    function showResult() {
      const dominantAura = calculateDominantAura();
      const { descrizione, colore } = categorie[dominantAura];
  
      questionElement.style.display = "none";
      quizButtons.style.display = "none";
      resultDiv.style.display = "block";
  
      resultText.innerHTML = `Il tuo Glimpse of Aura è <strong>${dominantAura}</strong>:<br>${descrizione}`;
  
      // Generate a gradient background image for the aura
      auraImage.src = generateGradient(colore);
      auraImage.style.display = "block";
    }
  
    function generateGradient(colori) {
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");
  
      const gradient = ctx.createLinearGradient(0, 0, 500, 500);
      gradient.addColorStop(0, colori[0]);
      gradient.addColorStop(1, colori[1]);
  
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      return canvas.toDataURL("image/png");
    }
  
    function handleAnswer(points) {
      const currentQuestion = quizDomande[currentQuestionIndex];
      const currentAura = currentQuestion.aura;
  
      auraPoints[currentAura] += points;
  
      // If user gave a positive answer, get another question from same aura
      if (points > 0 && domande[currentAura].length > 0) {
        const nextQuestion = domande[currentAura].shift();
        quizDomande.push({ question: nextQuestion, aura: currentAura });
      }
  
      currentQuestionIndex++;
      generateQuestion();
    }
  
    // EVENT LISTENERS
  
    // Start Quiz
    startButton.addEventListener("click", () => {
      titleElement.style.display = "none";
      // remove the "Premi 'Inizia' per cominciare..." hint
      startHint.style.display = "none";
      currentQuestionIndex = 0;
  
      // gather one question from each aura, then shuffle
      quizDomande = Object.keys(domande).map(aura => ({
        question: domande[aura].shift(),
        aura: aura,
      }));
      quizDomande.sort(() => Math.random() - 0.5);
  
      startButton.style.display = "none";
      quizButtons.style.display = "flex";
      generateQuestion();
    });
  
    // Answer Buttons
    moltoButton.addEventListener("click", () => {
      handleAnswer(1);
    });
    abbastanzaButton.addEventListener("click", () => {
      handleAnswer(0.25);
    });
    pocoButton.addEventListener("click", () => {
      handleAnswer(0);
    });
  
    // "Avanti" button -> hide result, show final message
    avantiButton.addEventListener("click", () => {
      resultDiv.style.display = "none";
      finalMessageDiv.style.display = "flex";
    });
  
    // Instagram button -> open in new tab
    instagramButton.addEventListener("click", () => {
      window.open("https://www.instagram.com/knowme_it?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", "_blank");
    });
  });
  