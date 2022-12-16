import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../tests/helpers/renderWithRouterAndRedux'
import App from '../App';

const mockFetchToken = 'c959340d21d2dd129533018b2da4fbdecf6e0196127eb1fce50e37c4e491e405'

describe('Testes da Página Login', () => {
    it('Teste se os componentes estao na tela', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const button = screen.getByRole('button', {name: /Configurações/i})
      userEvent.click(button);
      const { pathname } = history.location;
      expect(pathname).toBe('/settings');
    });
    it('Teste se os componentes estao na tela', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('Email');
    const name = screen.getByPlaceholderText('Nome');
    const buttonPlay = screen.getByRole('button', {name: /Play/i});
    expect(buttonPlay).toBeDisabled();
    userEvent.type(email, 'email@test.com');
    expect(buttonPlay).toBeDisabled();
    userEvent.clear(email);
    userEvent.type(name, 'Caio');
    expect(buttonPlay).toBeDisabled();
    });
    it('Teste se os componentes estao na tela', () => {
      renderWithRouterAndRedux(<App />);
    const email = screen.getByPlaceholderText('Email');
    const name = screen.getByPlaceholderText('Nome');
    const buttonPlay = screen.getByRole('button', {name: /Play/i});
    userEvent.type(email, 'caio@gmail.com');
    userEvent.type(name, 'Caio');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockFetchToken),
    });
    userEvent.click(buttonPlay);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  });
