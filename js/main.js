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
  if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
    // console.log('You found a match!')
    window.alert('You found a match!')
    clearCardsInPlay()
  } else {
    // console.log('Sorry, try again.')
    window.alert('Sorry, try again.')
    clearCardsInPlay()
  }
}

var flipCard = function () {
  var cardId = this.getAttribute('data-id')
  if (cardsInPlay.length === 1 && cardsInPlay[0].cardImage === this.getAttribute('src')) {
    // console.log('Cannot choose the same card twice')
    window.setTimeout(window.alert('Cannot choose the same card twice'), 50)
    return
  }
  // this.classList.add('flipped')
  // console.log('User flipped ' + cards[cardId].rank)
  // console.log(cards[cardId].cardImage)
  // console.log(cards[cardId].suit)

  // cardsInPlay.push(cards[cardId].rank)
  cardsInPlay.push(cards[cardId])

  this.setAttribute('src', cards[cardId].cardImage)

  if (cardsInPlay.length === 2) {
    window.setTimeout(checkForMatch, 50)
  }
}

var createBoard = function () {
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img')
    cardElement.setAttribute('src', 'images/back.png')
    cardElement.setAttribute('data-id', i)

    // console.log('i:' + i)
    // console.log('#data-id: ' + cardElement.getAttribute('data-id'))

    // cardElement.addEventListener('click', function () {
      // console.log('i:' + i)
      // console.log('#data-id: ' + cardElement.getAttribute('data-id'))
      // console.log('this#data-id: ' + this.getAttribute('data-id'))
      // flipCard(i)

      // thank god for stackoverflow https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function.
      // flipCard(this.getAttribute('data-id'))
    // })

    cardElement.addEventListener('click', flipCard)

    // document.getElementById('game-board').appendChild(cardElement)
    // document.getElementById('game-board').insertBefore(cardElement, document.querySelector('.reset-button'))
    // document.querySelector('.game-board').insertBefore(cardElement, document.querySelector('.game-board section'))
    document.querySelector('.card-container').appendChild(cardElement)
  }
}

var clearCardsInPlay = function () {
  cardsInPlay = []
}

document.querySelector('.reset-button').addEventListener('click', function () {
  for (var i = 0; i < 4; i++) {
    document.querySelector('.card-container').removeChild(document.querySelector('.card-container img'))
  }
  createBoard()
  cardsInPlay = []
})

createBoard()
