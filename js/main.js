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
    console.log('You found a match!')
    // window.alert('You found a match!')
  } else {
    console.log('Sorry, try again.')
    // window.alert('Sorry, try again.')
  }
}

var flipCard = function () {
  var cardId = this.getAttribute('data-id')
  if (cardsInPlay.length >= 2) {
    return
  } else if (cardsInPlay.length === 1 && cardsInPlay[0].cardImage === this.getAttribute('src')) {
    console.log('Cannot choose the same card twice')
    return
  }
  this.classList.add('flipped')
  console.log('User flipped ' + cards[cardId].rank)
  // console.log(cards[cardId].cardImage)
  // console.log(cards[cardId].suit)

  // cardsInPlay.push(cards[cardId].rank)
  cardsInPlay.push(cards[cardId])

  this.setAttribute('src', cards[cardId].cardImage)

  if (cardsInPlay.length === 2) {
    checkForMatch()
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
    document.getElementById('game-board').insertBefore(cardElement, document.querySelector('#game-board div'))
  }
}

document.querySelector('.reset-button').addEventListener('click', function () {
  console.log(document.querySelectorAll('.flipped'))
  for (var i = 0; i < cardsInPlay.length; i++) {
    console.log(document.querySelectorAll('.flipped')[i])
    document.querySelectorAll('.flipped')[i].classList.remove('flipped')
  }

  cardsInPlay = []
})

// flipCard(0)
// flipCard(2)

createBoard()
