import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';

import * as ROUTES from './constants/routes';

import Home from './Pages/Home';

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Switch>
        <Route path="/:city">
          <Home />
        </Route>

        <Route>
          <Redirect to={ROUTES.SYDNEY} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
