import React, { PureComponent } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Routes from './routes';
import './App.css';

const theme = createMuiTheme();

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  setIsAuthenticated = isAuthenticated => {
    this.setState({
      isAuthenticated
    });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Route
            render={props => (
              <Header
                {...this.props.location}
                {...props}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={this.setIsAuthenticated}
                key={1}
              />
            )}
          />
          <Routes
            {...this.props.location}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={this.setIsAuthenticated}
            key={2}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
