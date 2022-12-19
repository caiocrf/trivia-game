import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends React.Component {
  render() {
    const { score, name, gravatarEmail } = this.props;
    const emailUser = gravatarEmail;
    const emailHash = MD5(emailUser).toString();
    return (
      <header>
        <div>
          <p data-testid="header-player-name">{name}</p>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${emailHash}` }
            alt="Perfil"
          />
          <p data-testid="header-score">{score}</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});
export default connect(mapStateToProps)(Header);
