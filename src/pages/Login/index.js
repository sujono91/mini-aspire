import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Button, Paper } from 'material-ui';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import { login } from '../../api';
import '../../App.css';

const style = {
  height: 250,
  width: 250,
  textAlign: 'center',
  display: 'inline-block'
};

const errorLabel = 'This field is required';

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isSubmit: false,
      error: ''
    };
  }

  handleChangeUsername = event => {
    const { value: username } = event.target;
    this.setState({
      username
    });
  };

  handleChangePassword = event => {
    const { value: password } = event.target;
    this.setState({
      password
    });
  };

  requestLogin = async () => {
    const { username, password } = this.state;
    const { history, setIsAuthenticated } = this.props;

    const result = await login({
      username,
      password
    });

    if (!result) {
      return this.setState({
        error: 'Username or password is wrong'
      });
    }

    localStorage.setItem('user', JSON.stringify(result));
    setIsAuthenticated(true);
    history.push('/home');
  };

  handleLogin = () => {
    this.setState({
      isSubmit: true
    });

    const { username, password } = this.state;

    if (_.isEmpty(username) || _.isEmpty(password)) {
      return;
    }

    this.requestLogin();
  };

  render() {
    const { username, password, isSubmit, error } = this.state;

    return (
      <div className="fullContainer">
        <Paper style={style} elevation={1}>
          <br />
          <div className="textField">
            <FormControl
              error={isSubmit && _.isEmpty(username)}
              aria-describedby="username-text">
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                value={username}
                onChange={this.handleChangeUsername}
              />
              {isSubmit &&
                _.isEmpty(username) && (
                  <FormHelperText id="username-text">
                    {errorLabel}
                  </FormHelperText>
                )}
            </FormControl>
          </div>
          <div className="textField">
            <FormControl
              error={isSubmit && _.isEmpty(password)}
              aria-describedby="password-text">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={this.handleChangePassword}
              />
              {isSubmit &&
                _.isEmpty(password) && (
                  <FormHelperText id="password-text">
                    {errorLabel}
                  </FormHelperText>
                )}
            </FormControl>
          </div>
          <span className={`error ${!_.isEmpty(error) ? 'visible' : 'hidden'}`}>
            {error}
          </span>
          <Button
            variant="raised"
            color="primary"
            style={{ marginTop: 25 }}
            onClick={this.handleLogin}>
            Login
          </Button>
        </Paper>
      </div>
    );
  }
}

export default LoginPage;
