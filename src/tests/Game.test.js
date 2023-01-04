import mockFetchFailQuestions from "./mockFetchFail.js";
import mockFetchQuestions from "./mockFetch.js";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import App from '../App';

describe('testando a tela de jogo', () => {
  jest.setTimeout(50000);
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetchQuestions),
    }));

  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('testando a pontuação do usúario', async () => {
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

    const scoreUser = await screen.findByTestId('header-score');

    const correctAnswer_1 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer_1);

    const buttonNext = await screen.findByTestId('btn-next');
    expect(
      scoreUser.innerHTML)
      .toBe('70');
    userEvent.click(buttonNext);

    const correctAnswer_2 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer_2)
    expect(
      scoreUser.innerHTML).
      toBe('170');
    userEvent.click(buttonNext);

    const correctAnswer_3 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer_3)
    expect(scoreUser.innerHTML).
    toBe('210');
  });

  it('testaando caso log com um token inválido', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetchFailQuestions),
    }));
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
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/'));
  });

  it('testando o redirect para a pag de configurações', async () => {
    
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

    const buttonSettings = await screen.findByTestId('btn-settings');
    userEvent.click(buttonSettings);
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/settings'));
  });

  it('testando se as informações são salvas no LC caso acerte 5 perguntas', async () => {
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

    const trueAnswer_1 = await screen.findByTestId('correct-answer');
    userEvent.click(trueAnswer_1);
    const buttonNext = await screen.findByTestId('btn-next');
    userEvent.click(buttonNext);

    const trueanswer_2 = await screen.findByTestId('correct-answer');
    userEvent.click(trueanswer_2);
    userEvent.click(buttonNext);

    const trueAnswer_3 = await screen.findByTestId('correct-answer');
    userEvent.click(trueAnswer_3);
    userEvent.click(buttonNext);

    const trueAnswer_4 = await screen.findByTestId('correct-answer');
    userEvent.click(trueAnswer_4);
    userEvent.click(buttonNext);

    const trueAnswer_5 = await screen.findByTestId('correct-answer');
    userEvent.click(trueAnswer_5);
    userEvent.click(buttonNext);
    await waitFor(() => expect(
      history.location.pathname).
      toBe('/feedback'));
    expect(localStorage.getItem('ranking')).
    toBe('[{"name":"My name","gravatarEmail":"caiopinho@gmail.com","score":380}]');
  }); 

  it('testa se os botẽs sao desativas apos o tempo acabar', async () => {

    const AppComponent = renderWithRouterAndRedux(<App />);
    const emailUser = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailUser, 'caiopinho@gmail.com');

    const nameUser = screen.getByTestId('input-player-name');
    userEvent.type(nameUser, 'My name');

    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.click(buttonPlay);

    const correct_Answer = await screen.findByTestId('correct-answer');

    await waitFor(() => expect(
      AppComponent.history.location.pathname).
      toBe('/game'));
    const timerScreen = await screen.findByText(/Timer:/i);
    await waitFor(() => expect(
      timerScreen.innerHTML).
      toBe('Timer:29seconds'));
  });
});
