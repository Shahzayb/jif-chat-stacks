import React from 'react';
import {Connect} from '@stacks/connect-react';
import {useConnectAuthOptions} from 'common/hooks/useConnectAuthOptions';
import {Switch, Route} from 'react-router-dom';
import Home from 'pages/Home';
import Post from 'pages/Post';

function App() {
  const authOptions = useConnectAuthOptions();

  return (
    <Connect authOptions={authOptions}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/post">
          <Post />
        </Route>
      </Switch>
    </Connect>
  );
}

export default App;
