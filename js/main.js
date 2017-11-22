console.log('Up and running!')

var cards = [
  {
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts-alpha-fix.png'
  },
  {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds-alpha-fix.png'
  },
  {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts-alpha-fix.png'
  },
  {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds-alpha-fix.png'
  }
]

var scoreValue, scoreGoal

var getselectedCards = function () {
  return document.querySelectorAll('.selected')
}

var checkForMatch = function (pairCompareList) {
  var isCardMatch
  if (pairCompareList[0].getAttribute('data-rank') === pairCompareList[1].getAttribute('data-rank')) {
    // console.log('You found a match!')
    window.alert('You found a match!')
    isCardMatch = true
  } else {
    // console.log('Sorry, try again.')
    window.alert('Sorry, try again.')
    isCardMatch = false
  }
  for (var i = 0; i < pairCompareList.length; i++) {
    pairCompareList[i].classList.remove('selected')
    if (isCardMatch) {
      pairCompareList[i].classList.add('matched')
    } else {
      pairCompareList[i].setAttribute('src', 'images/back-alpha-fix.png')
    }
  }
  if (isCardMatch) {
    scoreValue += 1
    document.querySelector('.score-value').textContent = scoreValue
  }
}

var flipCard = function () {
  var cardId = this.getAttribute('data-id')
  var selectedCardNodeList = getselectedCards()
  // console.log('flippeCardNodeList at start: ' + selectedCardNodeList)
  // console.log(selectedCardNodeList)
  if (this.classList.contains('matched')) {
    window.setTimeout(window.alert('Cannot choose a matched card'), 50)
    return
  } else if (selectedCardNodeList.length === 1 && selectedCardNodeList[0].getAttribute('src') === this.getAttribute('src')) {
    // console.log('Cannot choose the same card twice')
    window.setTimeout(window.alert('Cannot choose the same card twice'), 50)
    return
  }
  this.classList.add('selected')
  this.setAttribute('src', cards[cardId].cardImage)

  selectedCardNodeList = getselectedCards()
  // console.log('flippeCardNodeList at end: ' + selectedCardNodeList)
  // console.log(selectedCardNodeList)
  if (selectedCardNodeList.length === 2) {
    window.setTimeout(function () {
      checkForMatch(selectedCardNodeList)
    }, 50)
  }
}

var createBoard = function () {
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img')
    cardElement.setAttribute('src', 'images/back-alpha-fix.png')
    cardElement.setAttribute('data-id', i)
    cardElement.setAttribute('data-rank', cards[i].rank)

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
  scoreValue = 0
  scoreGoal = 2
  document.querySelector('.score-value').textContent = scoreValue
  document.querySelector('.score-goal').textContent = scoreGoal
}

document.querySelector('.reset-button').addEventListener('click', function () {
  for (var i = 0; i < 4; i++) {
    document.querySelector('.card-container').removeChild(document.querySelector('.card-container img'))
  }
  createBoard()
})

createBoard()
