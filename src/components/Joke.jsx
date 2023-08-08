import { Component } from 'react'

export default class Joke extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="joke">
        <div className="score">
          <i onClick={this.props.upvote} className='bx bxs-up-arrow bx-sm'></i>
          <div className="likes">
            {this.props.votes}
          </div>
          <i onClick={this.props.downvote} className='bx bxs-down-arrow bx-sm'></i>
        </div>
        <p className="joke-text">{this.props.joke}</p>
        <div class="joke-emoji">
          <span className="emoji-span">😀</span>
        </div>
      </div>
    )
  }
}
