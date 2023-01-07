import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { clearState } from '../redux/actions';

class Feedback extends React.Component {
  feedbackMessage = () => {
    const { assertions } = this.props;
    const WELL_DONE = 'Well Done!';
    const COULD_BETTER = 'Could be better...';
    const THREE_QUESTIONS = 3;
    if (assertions < THREE_QUESTIONS) {
      return COULD_BETTER;
    }
    return WELL_DONE;
  };

  playAgainUer = () => {
    const { history, dispatch } = this.props;
    dispatch(clearState());
    history.push('/');
  };

  render() {
    const { score, assertions, history } = this.props;
    return (
      <div>
        <header>
          <Header />
        </header>
        <span data-testid="feedback-text">
          { this.feedbackMessage() }
        </span>
        <h3
          data-testid="feedback-total-score"
        >
          { score }
        </h3>
        <h3
          data-testid="feedback-total-question"
        >
          { assertions }
        </h3>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgainUer }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ranking of Players
        </button>
      </div>
    );
  }
}
Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,

};
const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  score: globalState.player.score,
});
export default connect(mapStateToProps)(Feedback);
