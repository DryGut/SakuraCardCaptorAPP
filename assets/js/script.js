const apiURL = `https://protected-taiga-89091.herokuapp.com/api/card`;
const botao = document.querySelector('.btn');
const busca = document.getElementById('buscar');
const botao1 = document.querySelector('.sakbtn');

const consumeApi = async()=>{
  let response = await fetch(apiURL);
  if(response.status === 200){
    let data = await response.json();
    return data;
  }
}

const getCardInfo = async(field)=>{
  const card = await consumeApi();
  let cardFront = document.getElementById('frontcard');
  let cardBack = document.getElementById('backcard')
  let cardInfo1 = document.querySelector('.cardinfo1');
  let cardInfo2 = document.querySelector('.cardinfo2');
  let cardDescricao = document.querySelector('.descricao');
  cardInfo1.src = card.data[field].clowCard;
  cardInfo2.src = card.data[field].cardsReverse.clowReverse;
  cardFront.appendChild(cardInfo1);
  cardBack.appendChild(cardInfo2);
  cardDescription = {
    nome: card.data[field].englishName,
    simbolo: card.data[field].kanji,
    traducao: card.data[field].Rōmaji,
    descricao: card.data[field].meaning
  };
  for(let key in cardDescription){
    let cardLista = document.createElement('li');
    cardLista.innerHTML = cardDescription[key];
    cardDescricao.appendChild(cardLista); 
  }
}

const getClowCard = async(field)=>{
  const card = await consumeApi();
  let cardFront = document.getElementById('frontcard');
  let cardBack = document.getElementById('backcard')
  let cardInfo1 = document.querySelector('.cardinfo1');
  let cardInfo2 = document.querySelector('.cardinfo2');
  cardInfo1.src = card.data[field].clowCard;
  cardInfo2.src = card.data[field].cardsReverse.clowReverse;
  cardFront.appendChild(cardInfo1);
  cardBack.appendChild(cardInfo2);
}

const getSakuraCard = async(field)=>{
  const data = await consumeApi();
  let cardFront = document.getElementById('frontcard');
  let cardBack = document.getElementById('backcard')
  let cardInfo1 = document.querySelector('.cardinfo1');
  let cardInfo2 = document.querySelector('.cardinfo2');
  cardInfo1.src = data.data[field].sakuraCard;
  cardInfo2.src = data.data[field].cardsReverse.sakuraReverse;
  cardFront.appendChild(cardInfo1);
  cardBack.appendChild(cardInfo2);
}

botao1.addEventListener('click', (event=>{
  event.preventDefault();
  let front = document.getElementById('frontcard1');
  let back = document.getElementById('backcard1');
  if(front.innerHTML === "Front Clow Card" && back.innerHTML === "Back Clow Card"){
    front.innerHTML = "Front Sakura Card";
    back.innerHTML = "Back Sakura Card";
    getSakuraCard(busca.value);
  }else{
    front.innerHTML = "Front Clow Card";
    back.innerHTML = "Back Clow Card";
    getClowCard(busca.value);
  }
}));

botao.addEventListener('click', (event=>{
  event.preventDefault();
  getCardInfo(busca.value);
}));