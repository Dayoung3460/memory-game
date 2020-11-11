const startBtn = document.querySelector('button');

startBtn.addEventListener("click", () => {
  const cardArray = [
    {
      name: "apple",
      img: "img/apple.jfif",
    },
    {
      name: "apple",
      img: "img/apple.jfif",
    },
    {
      name: "banana",
      img: "img/banana.jfif",
    },
    {
      name: "banana",
      img: "img/banana.jfif",
    },

    {
      name: "blueberry",
      img: "img/blueberry.jfif",
    },
    {
      name: "blueberry",
      img: "img/blueberry.jfif",
    },
    {
      name: "kiwi",
      img: "img/kiwi.jfif",
    },
    {
      name: "kiwi",
      img: "img/kiwi.jfif",
    },
    {
      name: "lime",
      img: "img/lime.jfif",
    },
    {
      name: "lime",
      img: "img/lime.jfif",
    },
    {
      name: "orange",
      img: "img/orange.jfif",
    },
    {
      name: "orange",
      img: "img/orange.jfif",
    },
  ];

  const extraCardArray = [
    {
      name: "pear",
      img: "img/pear.jfif"
    },
    {
      name: "pear",
      img: "img/pear.jfif"
    },
    {
      name: "plum",
      img: "img/plum.jfif"
    },
    {
      name: "plum",
      img: "img/plum.jfif"
    },
    {
      name: "pomegranate",
      img: "img/pomegranate.jfif"
    },
    {
      name: "pomegranate",
      img: "img/pomegranate.jfif"
    },
    {
      name: "watermelon",
      img: "img/watermelon.jfif"
    },
    {
      name: "watermelon",
      img: "img/watermelon.jfif"
    },
  ];

  const newArray = [...cardArray, ...extraCardArray];
  const grid = document.querySelector(".grid");
  let resultDisplay = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenId = [];
  const cardsWon = [];
  const lv1 = document.querySelector('#lv1');
  const lv2 = document.querySelector('#lv2');
  
  // remove the previous board
  if (grid.children) {
    grid.innerHTML = '';
  }

  if(lv2.checked) {
    grid.style.width = '510px';
    grid.style.height = '410px';
  } else {
    grid.style.width = "410px";
    grid.style.height = "310px";
  }

  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function createBoard() {
    if (resultDisplay !== "") {
      resultDisplay == "";
    } 

    if(lv1.checked) {
      for (let i = 0; i < cardArray.length; i++) {
        var card1 = document.createElement("img");
        card1.setAttribute("src", "img/card-back.jfif");
        card1.setAttribute("data-id", i);
        grid.appendChild(card1);
        card1.addEventListener("click", filpCard);
      } 
    } else {
      for (let i = 0; i < newArray.length; i++) {
        var card2 = document.createElement("img");
        card2.setAttribute("src", "img/card-back.jfif");
        card2.setAttribute("data-id", i);
        grid.appendChild(card2);
        card2.addEventListener("click", filpCard);
      } 
    }
  }

  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
      alert("You found a match");
      cards[optionOneId].setAttribute("src", "img/blank.jfif");
      cards[optionTwoId].setAttribute("src", "img/blank.jfif");
      cardsWon.push(cardsChosen);
      cards[optionOneId].style.pointerEvents = "none";
      cards[optionTwoId].style.pointerEvents = "none";
    } else {
      cards[optionOneId].setAttribute("src", "img/card-back.jfif");
      cards[optionTwoId].setAttribute("src", "img/card-back.jfif");
      alert("Sorry, try again");
    }

    cardsChosen = [];
    cardsChosenId = [];
    // Same value doesn't count each in array. score increases one by one
    resultDisplay.textContent = cardsWon.length;

    if(lv1.checked) {
      if (cardsWon.length === cardArray.length / 2) {
        grid.innerHTML = `<p>Congratulations! You found them all!</p>`;
      }
    } else {
      if (cardsWon.length === (newArray.length) / 2) {
        grid.innerHTML = `<p>Congratulations! You found them all!</p>`;
      }
    }
  }

  function filpCard() {
    if(lv1.checked) {
      var cardId1 = this.getAttribute("data-id");
      cardsChosen.push(cardArray[cardId1].name);
      this.setAttribute("src", cardArray[cardId1].img);
      cardsChosenId.push(cardId1);
    } else {
        var cardId2 = this.getAttribute("data-id");
        cardsChosen.push(newArray[cardId2].name);
        this.setAttribute("src", newArray[cardId2].img);
        cardsChosenId.push(cardId2);
    }
    
    this.classList.toggle("is-flipped");
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    } else if (cardsChosen.length >= 3) {
      this.classList.remove("is-flipped");
      this.setAttribute("src", "img/card-back.jfif");
    }
  }
  shuffle(cardArray);
  shuffle(newArray);
  createBoard();
});
