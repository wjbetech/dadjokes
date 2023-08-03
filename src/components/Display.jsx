import { Component } from 'react'
import axios from "axios"
import Joke from "./Joke"

export default class Display extends Component {

  constructor(props) {
    super(props)
    this.state = {
      joke: ""
    }
  }

  async componentDidMount() {
    const jokeData = await axios.get("https://icanhazdadjoke.com/")
    .then((res) => {
      console.log(res);
    })
  }

  render() {
    return (
      <div className="display">
        <div className="left-container">
          <h1>DAD JOKES</h1>
          <div>
            <span className="left-container-emoji">😂</span>
          </div>
          <button onClick={this.getJokes}>Get Jokes</button>
        </div>
        <div className="right-container">
          <Joke />
          <Joke />
          <Joke />
          <Joke />
          <Joke />
          <Joke />
        </div>
      </div>
    )
  }
}
