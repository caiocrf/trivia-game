import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  toPlay = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const rankingLC = JSON.parse(localStorage.getItem('ranking'));
    const sortScrenn = rankingLC.sort((a, b) => b.score - a.score);
    return (
      <>
        <div>
          <h3
            data-testid="ranking-title"
          >
            Ranking of Players
          </h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>score</th>
              <th>assertions</th>
            </tr>
          </thead>
          <tbody>
            { sortScrenn.map((ele, index) => (
              <tr key={ index }>
                <td data-testid={ `player-name-${index}` }>{ ele.name }</td>
                <td><img src={ ele.email } alt={ ele.name } /></td>
                <td data-testid={ `player-score-${index}` }>{ ele.score }</td>
                <td>{ ele.assertions }</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            type="button"
            onClick={ this.toPlay }
            data-testid="btn-go-home"
          >
            Ir para o inicil...
          </button>
        </div>
      </>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Ranking;
