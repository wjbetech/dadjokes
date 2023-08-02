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
    const options = {
      method: 'GET',
      url: 'https://dad-jokes.p.rapidapi.com/random/joke',
      headers: {
        'X-RapidAPI-Key': '81cb9a0ec2msh4302d1b19eaa7f8p184196jsn0e31a98787db',
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
        </div>
      </div>
    )
  }
}
