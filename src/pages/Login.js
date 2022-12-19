import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokenApi, getLoginUser } from '../redux/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isButtonDisable: true,
  };

  buttonValidation = () => {
    const { name, email } = this.state;
    if (email && name) {
      this.setState({
        isButtonDisable: false,
      });
    } else {
      this.setState({
        isButtonDisable: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  };

  RequestTokenApi = async () => {
    const { dispatch } = this.props;
    const api = ('https://opentdb.com/api_token.php?command=request');
    const response = await fetch(api);
    const request = await response.json();

    dispatch(getTokenApi(request.token));
    dispatch(getLoginUser(this.state));
    localStorage.setItem('token', request.token);
  };

  HandleToGame = async () => {
    const { history } = this.props;
    await this.RequestTokenApi();
    history.push('/game');
  };

  render() {
    const { name, email, isButtonDisable } = this.state;
    const { history } = this.props;
    return (
      <div className="container">
        <label htmlFor="name">
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            placeholder="Nome"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>
        <label htmlFor="email">
          <input
            data-testid="input-gravatar-email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isButtonDisable }
          onClick={ this.HandleToGame }
          className="btn btn-primary"
        >
          Play

        </button>

        <button
          className="btn btn-primary"
          data-testid="btn-settings"
          type="button"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Login);
