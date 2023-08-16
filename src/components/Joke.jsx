import { Component } from 'react'

export default class Joke extends Component {

  getColor() {
    if (this.props.votes >= 15) {
      return "#4CAF50";
    } else if (this.props.votes >= 12) {
      return "#8BC34A";
    } else if (this.props.votes >= 9) {
      return "#CDDC39";
    } else if (this.props.votes >= 6) {
      return "#FFEB3B"
    } else if (this.props.votes >= 3) {
      return "#FFC107"
    } else if (this.props.votes >= 0) {
      return "#FF9800"
    } else {
      return "#f44336"
    }
  }

  getEmoji() {
    if (this.props.votes >= 15) {
      return "🤣";
    } else if (this.props.votes >= 12) {
      return "😆";
    } else if (this.props.votes >= 9) {
      return "😁";
    } else if (this.props.votes >= 6) {
      return "😃"
    } else if (this.props.votes >= 3) {
      return "🙂"
    } else if (this.props.votes >= 0) {
      return "😑"
    } else {
      return "💩"
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="joke">
        <div className="score">
          <i onClick={this.props.upvote} className='bx bxs-up-arrow bx-sm'></i>
          <div className="likes" style={{borderColor: this.getColor()}}>
            {this.props.votes}
          </div>
          <i onClick={this.props.downvote} className='bx bxs-down-arrow bx-sm'></i>
        </div>
        <p className="joke-text">{this.props.text}</p>
        <div className="joke-emoji">
          <span className="emoji-span">{this.getEmoji()}</span>
        </div>
      </div>
    )
  }
}
