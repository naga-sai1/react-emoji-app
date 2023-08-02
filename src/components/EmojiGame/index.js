import {Component} from 'react'

import NavBar from '../NavBar'

import EmojiCard from '../EmojiCard'

import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    topScore: 0,
    clickedEmojiList: [],
    status: true,
  }

  resetGame = () => {
    this.setState({clickedEmojiList: [], status: true})
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, status: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isEmojiPresent = clickedEmojiList.includes(id)
    const clickedEmojisLength = clickedEmojiList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojiList: [...prevState.clickedEmojiList, id],
      }))
    }
  }

  render() {
    const {topScore, clickedEmojiList, status} = this.state
    const {emojisList} = this.props
    const shuffledEmojisList = this.getShuffledEmojisList()
    const isWon = clickedEmojiList.length === emojisList.length

    return (
      <div className="bg-container">
        <NavBar
          score={clickedEmojiList.length}
          topScore={topScore}
          status={status}
        />
        <div className="emoji-body">
          {status ? (
            <ul className="emojis-list-container">
              {shuffledEmojisList.map(eachEmoji => (
                <EmojiCard
                  key={eachEmoji.id}
                  emojiDetails={eachEmoji}
                  clickEmoji={this.clickEmoji}
                />
              ))}
            </ul>
          ) : (
            <WinOrLoseCard
              isWon={isWon}
              onClickPlayAgain={this.resetGame}
              score={clickedEmojiList.length}
            />
          )}
        </div>
      </div>
    )
  }
}

export default EmojiGame
