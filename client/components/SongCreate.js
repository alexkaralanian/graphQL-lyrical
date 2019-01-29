import React from "react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import { Link, hashHistory } from "react-router"

import query from "../queries/fetchSongs"

class SongCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = { title: "" };
  }

  onSubmit(event) {
    event.preventDefault();
    // Here we reach out to backend to add a song
    // define query variables in the options object passed to the mutate function

    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{ query }] // makes a second query to update ui
    }).then(() => hashHistory.push("/"))
  }

  render(){
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input onChange={event => this.setState({ title: event.target.value })} value={this.state.title}/>
        </form>
      </div>
    )
  }
}

// we are calling this mutation outside of the component class
// we use query variables to inject values into the mutation vai the
const mutation = gql`
  mutation AddSong ($title: String){
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate)
