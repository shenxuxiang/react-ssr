import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './common/Main';

export default function RouterComp(props) {
  const { routerList = [] } = props;
  return (
    <Main>
      <Switch>
        {
          routerList.map(opts => <Route {...opts} key={opts.path} />)
        }
      </Switch>
    </Main>
  );
}
