console.log('Up and running!')

var scoreValue, scoreGoal
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

var createCardDeck = function () {
  var difficultyLevel = getDifficultyLevel()
  var deck = []
  var cardTier = 0
  var deckSize
  switch (difficultyLevel) {
    case 'easy':
      deckSize = 4
      break
    case 'normal':
      deckSize = 8
      break
    case 'hard':
      deckSize = 12
      break
    default:
      console.log('not a valid tier level')
  }
  console.log('card tier:' + cardTier)
  console.log('deck size: ' + deckSize)

  for (var i = 0; i < deckSize; i++) {
    var card = {}
    console.log('iteration #' + (i + 1) + ': i % 4 = ' + (i % 4))
    switch (i % 4) {
      case 0:
        cardTier++
        card.rank = 'queen'
        card.suit = 'hearts'
        card.cardImage = 'images/queen-of-hearts-alpha-fix.png'
        card.tier = cardTier
        deck.push(card)
        break
      case 1:
        card.rank = 'queen'
        card.suit = 'diamonds'
        card.cardImage = 'images/queen-of-diamonds-alpha-fix.png'
        card.tier = cardTier
        deck.push(card)
        break
      case 2:
        card.rank = 'king'
        card.suit = 'hearts'
        card.cardImage = 'images/king-of-hearts-alpha-fix.png'
        card.tier = cardTier
        deck.push(card)
        break
      case 3:
        card.rank = 'king'
        card.suit = 'diamonds'
        card.cardImage = 'images/king-of-diamonds-alpha-fix.png'
        card.tier = cardTier
        deck.push(card)
        break
      default:
        console.log('something went wrong making card #' + (i + 1))
    }
  }

  console.log(deck)
  return deck
}

/* how to shuffle an array, Knuth Shuffle, via https://stackoverflow.com/a/2450976 */
var shuffle = function (arr) {
  var currentIndex = arr.length
  var temporaryValue
  var randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = arr[currentIndex]
    arr[currentIndex] = arr[randomIndex]
    arr[randomIndex] = temporaryValue
  }

  return arr
}

var getDifficultyLevel = function () {
  return document.querySelector('.difficulty-active').getAttribute('data-difficulty')
}

var getSelectedNodeList = function () {
  return document.querySelectorAll('.card-selected')
}

var getSelectedCards = function () {
  var selectedNodeList = getSelectedNodeList()
  var selectedCardArray = []
  for (var i = 0; i < selectedNodeList.length; i++) {
    var selectedCardIndex = selectedNodeList[i].getAttribute('data-id')
    selectedCardArray.push(cards[selectedCardIndex])
  }
  return selectedCardArray
}

var getResetButtonNode = function () {
  return document.querySelector('.reset-button')
}

var resetBoard = function () {
  var numberOfCards = document.querySelectorAll('.card').length
  for (var i = 0; i < numberOfCards; i++) {
    document.querySelector('.cards-container').removeChild(document.querySelector('.card'))
  }
}

var createBoard = function () {
  cards = shuffle(cards)
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img')
    cardElement.classList.add('card', 'card-back')
    cardElement.setAttribute('src', 'images/back-alpha-fix.png')
    cardElement.setAttribute('data-id', i)
    cardElement.addEventListener('click', flipCard)

    // document.getElementById('game-board').appendChild(cardElement)
    // document.getElementById('game-board').insertBefore(cardElement, document.querySelector('.reset-button'))
    // document.querySelector('.game-board').insertBefore(cardElement, document.querySelector('.game-board section'))
    document.querySelector('.cards-container').appendChild(cardElement)
  }
  scoreValue = 0
  scoreGoal = 2
  document.querySelector('.score-value').textContent = scoreValue
  document.querySelector('.score-goal').textContent = scoreGoal
}

var flipCard = function () {
  var cardId = this.getAttribute('data-id')
  var selectedCardNodeList = getSelectedCards()

  if (this.classList.contains('card-matched')) {
    window.setTimeout(window.alert('Cannot choose a matched card'), 50)
    return
  } else if (this.classList.contains('card-selected')) {
    window.setTimeout(window.alert('Cannot choose the same card twice'), 50)
    return
  }

  this.classList.remove('card-back')
  this.classList.add('card-selected')
  this.setAttribute('src', cards[cardId].cardImage)
  selectedCardNodeList = getSelectedCards()

  if (selectedCardNodeList.length === 2) {
    window.setTimeout(function () {
      checkForMatch(selectedCardNodeList)
    }, 50)
    /* for some reason, I have to use call checkForMatch() in an anonymous function for it to display the second card before displaying the alert. I can't follow the syntax in line 90 for example */
  }
}

var checkForMatch = function (pairCompareList) {
  var isCardMatch
  if (pairCompareList[0].rank === pairCompareList[1].rank) {
    window.alert('You found a match!')
    isCardMatch = true
  } else {
    window.alert('Sorry, try again.')
    isCardMatch = false
  }

  var selectedNodeList = getSelectedNodeList()
  for (var i = 0; i < selectedNodeList.length; i++) {
    selectedNodeList[i].classList.remove('card-selected')
    if (isCardMatch) {
      selectedNodeList[i].classList.add('card-matched')
    } else {
      selectedNodeList[i].classList.add('card-back')
      selectedNodeList[i].setAttribute('src', 'images/back-alpha-fix.png')
    }
  }

  if (isCardMatch) {
    scoreValue += 1
    document.querySelector('.score-value').textContent = scoreValue
  }
}

/* EVENT LISTENER Fuctions */
// ==============================================

/* Reset Button Event Listener */
var setResetButtonListener = function () {
  var resetButtonNode = getResetButtonNode()
  resetButtonNode.addEventListener('click', function () {
    resetBoard()
    createBoard()
  })
}

/* Difficulty Button Event Listener */
var setDifficultyButtonListenter = function () {
  var difficultyButtonNodeList = document.querySelectorAll('.difficulty-button')
  var numberOfDifficultyButtons = difficultyButtonNodeList.length
  for (var i = 0; i < numberOfDifficultyButtons; i++) {
    difficultyButtonNodeList[i].addEventListener('click', function () {
      if (this.classList.contains('difficulty-active')) {
        console.log('Please choose a new difficulty')
      } else {
        var oldDifficultyLevel = getDifficultyLevel()
        document.querySelector('.difficulty-active').classList.remove('difficulty-active')
        this.classList.add('difficulty-active')
        var newDifficultyLevel = getDifficultyLevel()
        var resetButtonNode = getResetButtonNode()
        resetButtonNode.classList.remove('difficulty-' + oldDifficultyLevel)
        switch (newDifficultyLevel) {
          case 'easy':
            resetButtonNode.classList.add('difficulty-' + newDifficultyLevel)
            break
          case 'normal':
            resetButtonNode.classList.add('difficulty-' + newDifficultyLevel)
            break
          case 'hard':
            resetButtonNode.classList.add('difficulty-' + newDifficultyLevel)
            break
          /* the default case shouldn't ever run, but just in case */
          default:
            console.log('invalid difficulty level')
        }
        resetBoard()
        createBoard()
      }
    })
  }
}

/* A little hacky, but call the createBoard() function when the script finishes loading. I would prefer $(document).ready() or something */
setDifficultyButtonListenter()
setResetButtonListener()
createBoard()
