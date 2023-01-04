import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTokenUser, getLoginUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isButtonDisable: true,
  };

  redirectSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleToGame = async () => {
    const { dispatch, history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const request = await response.json();
    dispatch(getLoginUser(this.state));
    dispatch(getTokenUser(request.token));

    localStorage.setItem('token', request.token);
    history.push('/game');
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
    }, () => this.buttonValidation());
  };

  render() {
    const { isButtonDisable, name, email } = this.state;
    return (
      <div>
        <label htmlFor="Email">
          <input
            data-testid="input-gravatar-email"
            value={ email }
            type="email"
            name="email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="Name">
          <input
            value={ name }
            data-testid="input-player-name"
            name="name"
            placeholder="Name"
            onChange={ this.handleChange }
          />
        </label>
        <div>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isButtonDisable }
            onClick={ () => { this.handleToGame(); } }
          >
            Play

          </button>
        </div>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.redirectSettings }
        >
          configurações
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
