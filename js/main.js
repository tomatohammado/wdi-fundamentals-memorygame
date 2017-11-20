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
  } else if (cardsInPlay.length !== 2) {
    console.log('You need two cards to compare.')
  } else {
    console.log('Sorry, try again.')
  }
}

var flipCard = function (cardId) {
  console.log('User flipped ' + cards[cardId])

  cardsInPlay.push(cards[cardId])

  checkForMatch()
}

flipCard(0)
flipCard(2)
