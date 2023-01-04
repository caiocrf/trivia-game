import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MD5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail, redirectPage } = this.props;
    const emailUser = gravatarEmail;
    const emailHash = MD5(emailUser).toString();
    return (
      <div>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${emailHash}` }
            alt="perfil"
          />
          <p data-testid="header-player-name">{`User: ${name}`}</p>
        </div>
        <div>
          <p data-testid="header-score">{`Points: ${score}`}</p>
        </div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => redirectPage() }
        >
          configurações
        </button>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  redirectPage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
