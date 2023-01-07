import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const rankingLcSort = getRanking.sort((a, b) => b.score - a.score);
    this.setState({ rank: rankingLcSort });
  }

  redirectPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { rank } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {rank.map((ranki, index = 0) => (
          <div key={ index }>
            <p
              data-testid={ `player-name-${index}` }
            >
              {ranki.name}
            </p>
            <p data-testid={ `player-score-${index}` }>
              {ranki.score}
            </p>
            <p>{ranki.gravatarEmail}</p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectPage }
        >
          Home
        </button>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Ranking);
