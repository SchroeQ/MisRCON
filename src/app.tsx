import * as React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter as Router, Route, Switch } from 'react-router';

import { injectGlobalStyles } from './styles/global-styles';

import Admin from './containers/Admin';
import CreateAccount from './containers/CreateAccount';
import ForgotPassword from './containers/ForgotPassword';
// import Login from './containers/Login';
import ServerSelect from './containers/ServerSelect';
import createConnection from './db';
import { Dispatch } from './redux/redux-types';
import { serversActions } from './redux/servers';
import { tasksActions } from './redux/tasks';

type Props = {
  dispatch: Dispatch;
};
type State = {};
class WrappedApp extends React.Component<Props, State> {
  public async componentDidMount() {
    injectGlobalStyles();
    await createConnection();
    await this.props.dispatch(serversActions.hydrateFromDbThunk());
    await this.props.dispatch(tasksActions.hydrateFromDbThunk());
  }

  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path={'/'} component={Admin} />
          {/*<Route exact path={'/'} component={Login} />*/}
          <Route path={'/select'} component={ServerSelect} />
          <Route path={'/create'} component={CreateAccount} />
          <Route path={'/forgot'} component={ForgotPassword} />
          <Route path={'/admin'} component={Admin} />
        </Switch>
      </Router>
    );
  }
}
export const App = connect()(WrappedApp);
