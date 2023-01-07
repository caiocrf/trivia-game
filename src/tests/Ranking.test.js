import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

describe('Testa a página de Ranking', () => {
  test('testando o button home', async () => {
    const { history } = renderWithRouterAndRedux(<Ranking />);
      const homeButton = screen.getByTestId('btn-go-home')
    expect(homeButton).toHaveTextContent('Home')
    expect(homeButton).toBeInTheDocument();
    })
    test('testando a rota do button home', async () => {
        const { history } = renderWithRouterAndRedux(<Ranking />);
        const homeBtn = screen.getByTestId('btn-go-home')
        userEvent.click(homeBtn);
    
        expect(history.location.pathname).toBe('/');
  });
  it('Testando se a pag Ranking salva as informações do user', async () => {
    const INITIAL_STATE = {
      player: {
        imgGravatar: '',
        name: 'caio',
        score: 10,
      },
    };
    localStorage.setItem('ranking', JSON.stringify([INITIAL_STATE.player]));
    renderWithRouterAndRedux(
      <Ranking />,
      INITIAL_STATE,
      '/ranking',
    );

    const caio = await screen.findByText('caio');
    const scorePlayer = screen.getByTestId('player-score-0');
    expect(caio).toBeInTheDocument();
    expect(scorePlayer).toBeInTheDocument();
    window.location.reload(true);
    expect(caio).toBeInTheDocument();
  });

  it('testando se o ranking está em ondem decrescente ', async () => {
    const INITIAL_STATE = [ {
      imgGravatar: '',
      name: 'cem',
      score: 100,
    },
    {
        imgGravatar: '',
        name: 'quarenta',
        score: 40,
      },
       {
      imgGravatar: '',
      name: 'oitenta',
      score: 80,
    }, {
      imgGravatar: '',
      name: 'trinta',
      score: 30,
    }];
    localStorage.setItem('ranking', JSON.stringify(INITIAL_STATE));
    renderWithRouterAndRedux(
      <Ranking />,
      INITIAL_STATE,
      '/ranking',
    );
    const cem = screen.getByTestId('player-name-0');
    const score100 = screen.getByTestId('player-score-0');

    const quarenta = screen.getByTestId('player-name-1');
    const score40 = screen.getByTestId('player-score-1');

    const vinte = screen.getByTestId('player-name-2');
    const score20 = screen.getByTestId('player-score-2');

    const trinta = screen.getByTestId('player-name-3');
    const score30 = screen.getByTestId('player-score-3');

    expect(vinte.textContent).toBe('vinte');
    expect(score20.textContent).toBe('20');

    expect(trinta.textContent).toBe('trinta');
    expect(score30.textContent).toBe('30');

    expect(quarenta.textContent).toBe('quarenta');
    expect(score40.textContent).toBe('40');

    expect(cem.textContent).toBe('cem');
    expect(score100.textContent).toBe('100');

  });
});
