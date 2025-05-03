// src/utils/getFanProfile.js
export function getFanProfile(answers) {
    // Respostas 6,7,8 e 9 estão nos índices 5,6,7 e 8
    const derrota     = answers[5]; // "Analiso a partida para entender o que deu errado", etc
    const jogador     = answers[6]; // "O IGL ou o coach,...", etc
    const diaDeJogo   = answers[7]; // "Assisto com atenção e analiso jogadas", etc
    const comunidade  = answers[8]; // "Modero grupos ou crio conteúdo", etc
  
    const score = {
      estrategico: 0,
      raiz:       0,
      fanatic:    0,
      casual:     0,
    };
  
    // Questão 6: Reação à derrota
    if (derrota === "Analiso a partida para entender o que deu errado")       score.estrategico++;
    else if (derrota === "Continuo torcendo com orgulho")                    score.raiz++;
    else if (derrota === "Grito no Twitter e cobro mudanças")                score.fanatic++;
    else                                                                      score.casual++;
  
    // Questão 7: Qual jogador representa você?
    if (jogador === "O IGL ou o coach, sempre pensando estrategicamente")    score.estrategico++;
    else if (jogador === "O veterano que nunca abandona o time")             score.raiz++;
    else if (jogador === "O fragger agressivo que quer matar todos")         score.fanatic++;
    else                                                                      score.casual++;
  
    // Questão 8: O que faz no dia de jogo?
    if (diaDeJogo === "Assisto com atenção e analiso jogadas")               score.estrategico++;
    else if (diaDeJogo === "Visto a camisa da FURIA e faço um churrasco")    score.raiz++;
    else if (diaDeJogo === "Pinto o rosto e grito FUUUURIAAAAAA")            score.fanatic++;
    else                                                                      score.casual++;
  
    // Questão 9: Como contribui para a comunidade?
    if (comunidade === "Modero grupos ou crio conteúdo")                     score.estrategico++;
    else if (comunidade === "Sempre interajo nas lives e redes")             score.raiz++;
    else if (comunidade === "Espalho a palavra da FURIA para todos")         score.fanatic++;
    else                                                                      score.casual++;
  
    // Escolhe o perfil com maior pontuação
    const [perfil] = Object.entries(score)
      .sort(([, a], [, b]) => b - a)[0]; // pega a chave do maior valor
  
    switch (perfil) {
      case 'estrategico': return 'Fã Estratégico';
      case 'raiz':        return 'Fã Raiz';
      case 'fanatic':     return 'Torcedor Fanático';
      case 'casual':      return 'Fã Casual';
      default:            return 'Fã da FURIA';
    }
  }
  