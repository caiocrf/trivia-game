import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

describe('Testando a page Login', () => {
    it('Testando o input Email', () => {
        renderWithRouterAndRedux(<App />);
        const emailUserInput = screen.getByTestId('input-gravatar-email');
        expect(emailUserInput).toBeInTheDocument();
    })
    it('Testa se o input nome está na tela', () => {
        renderWithRouterAndRedux(<App />);
        const nameUserInput = screen.getByTestId("input-player-name");
        expect(nameUserInput).toBeInTheDocument();
    })

    it('Testando a função isButtonDisable', () => {
        renderWithRouterAndRedux(<App />);
        const emailUserInput = screen.getByTestId('input-gravatar-email');
        const nameUserInput = screen.getByTestId("input-player-name");
        const buttonPlay = screen.getByRole('button', { name: 'Play' });
        userEvent.type(emailUserInput, 'test@trybe.com')
        userEvent.type(nameUserInput, 'test')
        expect(buttonPlay).toBeEnabled();
    })
    it('Testa se o btn Play redirect para /Game', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const emailUserInput = screen.getByTestId('input-gravatar-email');
        const nameUserInput = screen.getByTestId("input-player-name");
        userEvent.type(emailUserInput, 'test@trybe.com')
        userEvent.type(nameUserInput, 'test')
        const buttonPlay = screen.getByRole('button', { name: 'Play' })
        userEvent.click(buttonPlay)
        await waitFor(() => expect(history.location.pathname).not.toBe('/'))
        const redirectToGame = history.location.pathname
        expect(redirectToGame).toBe('/game')
    })
    it('Testando se há btn settings na pag Login', () => {
        renderWithRouterAndRedux(<App />);
        const buttonSettings = screen.getByTestId('btn-settings')
        expect(buttonSettings).toBeInTheDocument();
    })
    it('Testando se o btn configurações redirect para /settings', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        const buttonSettings = screen.getByTestId('btn-settings')
        userEvent.click(buttonSettings);
        expect(history.location.pathname).toBe('/settings');
    })
})