import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getScore, getAssertionsUser } from '../redux/actions';
import questionsAPI from '../service/getQuestions';
import styles from './Game.module.css';

class Game extends React.Component {
  state = {
    loading: true,
    questions: {},
    seconds: 30,
    round: 0,
    timer: false,
    call: false,
    click: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await questionsAPI(token);
    const ONE_SECONDS = 1000;
    const THREE_SECONDS = 3;
    setInterval(this.timerSeconds, ONE_SECONDS);

    if (questions.response_code === THREE_SECONDS) {
      localStorage.removeItem('token');
      history.push('/');
    }

    for (let index = 0; index < questions.results.length; index += 1) {
      const CORRECT_ANSWERS = questions.results[index].correct_answer;
      const INCORRECT_ANSWERS = questions.results[index].incorrect_answers;
      const random = [CORRECT_ANSWERS, ...INCORRECT_ANSWERS];
      const FIVE_5 = 0.5;
      const alternatives = random
        .sort(() => Math.random() - FIVE_5);

      questions.results[index].alternatives = alternatives;
    }

    this.setState({
      questions,
    }, () => { this.setState({ loading: false }); });
  }

  timerSeconds = () => {
    const { seconds } = this.state;

    if (seconds > 0) {
      this.setState({ seconds: [seconds - 1], timer: false });
    } else {
      this.setState({ timer: true });
    }
  };

  redirectPage = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClick = (id, type) => {
    const { dispatch } = this.props;
    const { seconds } = this.state;
    let typeNumber = 0;

    const hardType = 3;
    const mediumType = 2;
    const easyType = 1;

    if (type === 'hard') typeNumber = hardType;
    if (type === 'medium') typeNumber = mediumType;
    if (type === 'easy') typeNumber = easyType;

    if (id.includes('correct')) {
      const TEN_SCORE = 10;
      const ONE_SCORE = 1;
      dispatch(getAssertionsUser(ONE_SCORE));
      dispatch(getScore(TEN_SCORE + (seconds * typeNumber)));
    }

    this.setState({
      click: true,
    });
  };

  buttonNextQuestion = () => {
    const { round } = this.state;
    const THREE_ASKS = 3;
    if (round <= THREE_ASKS) {
      this.setState({
        call: false,
        seconds: 30,
        round: round + 1,
      });
    }
    if (round > THREE_ASKS) {
      const { name, score, gravatarEmail, history } = this.props;
      const someRanking = { name, gravatarEmail, score };
      const rankingLC = JSON.parse(localStorage.getItem('ranking')) ?? [];
      if (rankingLC !== []) {
        localStorage.setItem('ranking', JSON.stringify([...rankingLC, someRanking]));
      } else {
        localStorage.setItem('ranking', JSON.stringify(someRanking));
      }
      history.push('/feedback');
    }
  };

  render() {
    const { loading,
      questions,
      seconds,
      round,
      timer,
      click,
      call } = this.state;

    if (loading) return (<p>Loaging questions...</p>);

    const CORRECT_ANSWERS = questions.results[round].correct_answer;
    const INCORRECT_ANSWERS = questions.results[round].incorrect_answers;

    const { category,
      question,
      alternatives,
      type,
    } = questions.results[round];

    return (
      <div>
        <Header redirectPage={ this.redirectPage } />
        <div>
          <div>
            <h2 data-testid="question-category">
              {category}
            </h2>
          </div>
          <div>
            <p data-testid="question-text">
              {question}
            </p>
            <span>
              Timer:
              {seconds}
              { }
              seconds
            </span>
          </div>
          <div data-testid="answer-options">
            {
              alternatives.map((alt, index) => {
                let indexAnswers = 0;
                let DATA_ID = 'correct-answer';

                if (alt !== CORRECT_ANSWERS) {
                  INCORRECT_ANSWERS.find((incorrectAnswer, i) => {
                    if (incorrectAnswer === alt) indexAnswers = i;
                    return 0;
                  });
                  DATA_ID = `wrong-answer-${indexAnswers}`;
                }
                let style = styles.answer;
                if (call) {
                  if (alt !== CORRECT_ANSWERS) {
                    style = styles.incorrectAnswer;
                    return (
                      <button
                        data-testid={ DATA_ID }
                        type="button"
                        key={ index }
                        className={ style }
                        disabled={ timer }
                        onClick={ () => this.setState({ call: true }) }
                      >
                        {alt}
                      </button>
                    );
                  }
                  style = styles.correctAnswer;
                }
                return (
                  <button
                    data-testid={ DATA_ID }
                    type="button"
                    key={ index }
                    className={ style }
                    disabled={ timer }
                    onClick={ () => this
                      .setState({ call: true }, () => this
                        .handleClick(DATA_ID, type)) }
                  >
                    {alt}
                  </button>
                );
              })
            }

            {seconds === 0 || click === true
              ? (
                <div>
                  <button
                    data-testid="btn-next"
                    className={ styles.buttonNext }
                    type="button"
                    onClick={ this.buttonNextQuestion }
                  >
                    Next
                  </button>
                </div>
              )
              : null}
          </div>
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Game);
