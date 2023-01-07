import mockFetchQuestions from "./mockFetchQuestions";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import App from '../App';

describe('testando a page feedback', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetchQuestions),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('testando o redirect do btn Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailUser = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailUser, 'caiopinho@gmail.com');

    const nameUser = screen.getByTestId('input-player-name');
    userEvent.type(nameUser, 'My name');

    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.click(buttonPlay);
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/game'));

    const answerRed_1 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerRed_1);
    const buttonNext = await screen.findByTestId('btn-next');
    userEvent.click(buttonNext);

    const answerRed_2 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerRed_2);
    userEvent.click(buttonNext);

    const answer_Red_3 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answer_Red_3);
    userEvent.click(buttonNext);

    const answerRed_4 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerRed_4);
    userEvent.click(buttonNext);

    const answerRed_5 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerRed_5);
    userEvent.click(buttonNext);
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/feedback'));


    const redirectToRankingBtn = await screen.findByTestId('btn-ranking');
    userEvent.click(redirectToRankingBtn);
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/ranking'));

    const redirectToHome = await screen.findByTestId('btn-go-home');
    userEvent.click(redirectToHome);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  it('testando o bnt play again ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailUser = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailUser, 'caiopinho@gmail.com');

    const nameUser = screen.getByTestId('input-player-name');
    userEvent.type(nameUser, 'My name');

    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.click(buttonPlay);
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/game'));

    const answerFail_1 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerFail_1);

    const buttonNext = await screen.findByTestId('btn-next');
    userEvent.click(buttonNext);

    const answerRed_2 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerRed_2);
    userEvent.click(buttonNext);

    const answerFail_3 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerFail_3);
    userEvent.click(buttonNext);

    const answerRed_4 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerRed_4);
    userEvent.click(buttonNext);

    const answerFail_5 = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answerFail_5);
    userEvent.click(buttonNext);
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/feedback'));

    const feedbackMessage = await screen.findByTestId('feedback-text');
    expect(feedbackMessage.innerHTML).
    toBe('Could be better...');

    const buttonPlayAgain = await screen.findByTestId('btn-play-again');
    userEvent.click(buttonPlayAgain);
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/'));
  })
});