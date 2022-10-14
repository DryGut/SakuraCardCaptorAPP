const htmlTags = {
  searchCardBtn: document.querySelector('.btn'),
  searchCardInput: document.getElementById('buscar'),
  switchCardBtn: document.querySelector('.sakbtn'),
  cardFront: document.getElementById('frontcard'),
  cardBack: document.getElementById('backcard'),
  cardInfo1: document.querySelector('.cardinfo1'),
  cardInfo2: document.querySelector('.cardinfo2'),
  changeFrontCard: document.getElementById('frontcard1'),
  changeBackCard: document.getElementById('backcard1')
};

const consumeApi = async()=>{
  const apiURL = `https://protected-taiga-89091.herokuapp.com/api/card`;
  let response = await fetch(apiURL);
  if(response.status === 200){
    let data = await response.json();
    return data;
  }
}

const getCardInfo = async(field)=>{
  const card = await consumeApi();
  let cardDescricao = document.querySelector('.descricao');
  let cardDescription = {
    nome: card.data[field].englishName,
    simbolo: card.data[field].kanji,
    traducao: card.data[field].Rōmaji,
    descricao: card.data[field].meaning
  };
  for(let key in cardDescription){
    let cardList = document.createElement('li');
    cardList.innerHTML = cardDescription[key];
    cardDescricao.appendChild(cardList); 
  }
}

const getClowCard = async(field)=>{
  const card = await consumeApi();
  htmlTags.cardInfo1.src = card.data[field].clowCard;
  htmlTags.cardInfo2.src = card.data[field].cardsReverse.clowReverse;
  htmlTags.cardFront.appendChild(htmlTags.cardInfo1);
  htmlTags.cardBack.appendChild(htmlTags.cardInfo2);
}

const getSakuraCard = async(field)=>{
  const card = await consumeApi();
  htmlTags.cardInfo1.src = card.data[field].sakuraCard;
  htmlTags.cardInfo2.src = card.data[field].cardsReverse.sakuraReverse;
  htmlTags.cardFront.appendChild(htmlTags.cardInfo1);
  htmlTags.cardBack.appendChild(htmlTags.cardInfo2);
}

htmlTags.switchCardBtn.addEventListener('click', (event=>{
  event.preventDefault();
  if(htmlTags.changeFrontCard.innerHTML === "Front Clow Card" && htmlTags.changeBackCard.innerHTML === "Back Clow Card"){
    htmlTags.changeFrontCard.innerHTML = "Front Sakura Card";
    htmlTags.changeBackCard.innerHTML = "Back Sakura Card";
    getSakuraCard(htmlTags.searchCardInput.value);
  }else{
    htmlTags.changeFrontCard.innerHTML = "Front Clow Card";
    htmlTags.changeBackCard.innerHTML = "Back Clow Card";
    getClowCard(htmlTags.searchCardInput.value);
  }
}));

htmlTags.searchCardBtn.addEventListener('click', (event=>{
  event.preventDefault();
  getCardInfo(htmlTags.searchCardInput.value);
  getClowCard(htmlTags.searchCardInput.value);
}));
