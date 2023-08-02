import { Component } from 'react'

export default class Joke extends Component {

  constructor(props) {
    super(props)
    this.state = {
      score: "10"
    }
    this.handleAddScore = this.handleAddScore.bind(this);
    this.handleSubtractScore = this.handleSubtractScore.bind(this);
  }

  handleAddScore() {

  }

  handleSubtractScore() {

  }


  render() {
    return (
      <div className="joke">
        <div className="score">
          <i onClick={this.handleAddScore} className='bx bxs-up-arrow bx-sm'></i>
          <div className="likes">
            {this.state.score}
          </div>
          <i onClick={this.handleSubtractScore} className='bx bxs-down-arrow bx-sm'></i>
        </div>
        <div className="joke-content">
          <p>{this.props.joke}</p>
        </div>
      </div>
    )
  }
}
