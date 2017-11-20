console.log('Up and running!')

var cards = [
  {
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts.png'
  },
  {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.png'
  },
  {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts.png'
  },
  {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.png'
  }
]
var cardsInPlay = []

var checkForMatch = function () {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    console.log('You found a match!')
  } else if (cardsInPlay.length === 2) {
    console.log('Sorry, try again.')
  } else {
    // console.log('You need exactly two cards to compare.')
  }
}

var flipCard = function (cardId) {
  console.log('User flipped ' + cards[cardId].rank)
  // console.log(cards[cardId].cardImage)
  // console.log(cards[cardId].suit)

  cardsInPlay.push(cards[cardId].rank)

  checkForMatch()
}

var createBoard = function () {
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img')
    cardElement.setAttribute('src', 'images/back.png')
    cardElement.setAttribute('data-id', i)

    // console.log('i:' + i)
    // console.log('#data-id: ' + cardElement.getAttribute('data-id'))

    cardElement.addEventListener('click', function () {
      // console.log('i:' + i)
      // console.log('#data-id: ' + cardElement.getAttribute('data-id'))
      // console.log('this#data-id: ' + this.getAttribute('data-id'))
      // flipCard(i)

      // thank god for stackoverflow https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function.
      flipCard(this.getAttribute('data-id'))
    })

    document.getElementById('game-board').appendChild(cardElement)
  }
}

// flipCard(0)
// flipCard(2)

createBoard()
