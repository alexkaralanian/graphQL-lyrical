import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client"
import { ApolloProvider } from "react-apollo"
import {Router, Route, hashHistory, IndexRoute} from "react-router"

import App from './components/App'
import SongList from "./components/SongList"
import SongCreate from "./components/SongCreate"
import SongDetail from "./components/SongDetail"

import "./style/style.css"

const client = new ApolloClient({
  dataIdFromObject: obj => obj.id
  // looks at every record and uses id to indentify that piece of data.
  // must ask for an id for every query
  // you can always refetch queries, but you have to make a follow-up request
  // here only a single request is need to update data
  // dev.apollodata.com/react/cache-updates.html
  // assumes ids are unique across entire app
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}/>
          <Route path="songs/new" component={SongCreate} />
           <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>

  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
