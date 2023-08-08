import { Component } from 'react'
import axios from "axios"
import Joke from "./Joke"
import { v4 as uuidv4 } from 'uuid';

export default class Display extends Component {

  static defaultProps = {
    jokeCount: 10
  }

  constructor(props) {
    super(props)
    this.state = {
      jokes: [],
      joke: "",
      votes: 0
    }
    this.getJokes = this.getJokes.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  async componentDidMount() {
    let jokesArr = [];
    while(jokesArr.length < this.props.jokeCount) {
      let jokeData = await axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "Application/json"}
      });
      jokesArr.push({id: uuidv4(), joke: jokeData.data.joke, votes: 0});
    }
    this.setState({
      jokes: jokesArr
    })
  }

  async getJokes() {
        let jokesArr = [];
        while(jokesArr.length < this.props.jokeCount) {
          let jokeData = await axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "Application/json"}
          });
          jokesArr.push(jokeData.data.joke);
        }
        this.setState({
          jokes: jokesArr
        })
  }

  handleVote(id, delta) {
    this.setState(prevState => ({
      jokes: prevState.jokes.map(j => (
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ))
    }))
  }

  render() {
    const jokes = this.state.jokes.map(j => (
      <Joke
        key={j.id}
        joke={j.joke}
        votes={j.votes}
        upvote={() => this.handleVote(j.id, 1)}
        downvote={() => this.handleVote(j.id, -1)}
      />
    ))
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
          {jokes}
        </div>
      </div>
    )
  }
}
