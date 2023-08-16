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
      id: uuidv4(),
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false,
      votes: 0
    }
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    console.log(this.state.jokes)
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      let jokes = [];
      while (jokes.length < this.props.jokeCount) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        });
        let newJoke = res.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE!");
          console.log(newJoke);
        }
      }
      this.setState(
        st => ({
          loading: false,
          jokes: [...st.jokes, ...jokes]
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    this.setState(prevState => ({
      jokes: prevState.jokes.map(j => (
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ))
    }),
    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    )
  }

  handleClick() {
    this.setState({
      loading: true
    }, this.getJokes);
  }

  render() {

    if (this.state.loading) {
      return (
        <div className='JokeList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='JokeList-title'>Loading...</h1>
        </div>
      );
    }

    const jokes = this.state.jokes.sort((a, b) => b.votes - a.votes).map(j => (
      <Joke
        key={j.id}
        votes={j.votes}
        text={j.text}
        upvote={() => this.handleVote(j.id, 1)}
        downvote={() => this.handleVote(j.id, -1)}
      />
    ))

    return (
      <div className="display">
        <div className="left-container">
          <h1>DAD JOKES</h1>
          <div>
            <span className="left-container-emoji">😀</span>
          </div>
          <button onClick={this.handleClick}>Get Jokes</button>
        </div>
        <div className="right-container">
          {jokes}
        </div>
      </div>
    )
  }
}
