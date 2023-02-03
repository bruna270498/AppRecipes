import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';

const searchTestId = 'search-top-btn';
const inputTestId = 'search-input';
const nameRadioTestId = 'name-search-radio';
const btnPesquisarTestId = 'exec-search-btn';
const firstLetterTesteId = 'first-letter-search-radio';

describe('Verificando Header', () => {
  it('Verificando botão de Perfil e o titulo', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox', { name: /email/i });
    const senha = screen.getByRole('textbox', { name: /senha/i });
    const botao = screen.getByRole('button', { name: /entrar/i });
    fireEvent.change(email, {
      target: { value: 'breno@gmail.com' },
    });
    fireEvent.change(senha, {
      target: { value: 'OPTION1' },
    });
    fireEvent.click(botao);
    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    fireEvent.click(buttonProfile);
  });
  test('Verificando se ao clicar no botao de pesquisa o input aparece e desaparece', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole('textbox', { name: /email/i });
    const senha = screen.getByRole('textbox', { name: /senha/i });
    const botao = screen.getByRole('button', { name: /entrar/i });
    fireEvent.change(email, {
      target: { value: 'bruno@gmail.com' },
    });
    fireEvent.change(senha, {
      target: { value: 'OPTION1' },
    });
    fireEvent.click(botao);
    const buttonSearch = screen.getByRole('img', { name: /seachimg/i });
    fireEvent.click(buttonSearch);
    const inputPesquisa = screen.getByRole('textbox');
    expect(inputPesquisa).toBeInTheDocument();
    fireEvent.click(buttonSearch);
    expect(inputPesquisa).not.toBeInTheDocument();
  });
});

describe('Testando a aplicação searchBar', () => {
  it('Verifica se o fetch é feito após clicar no botão meals', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealIngredients),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(inputTestId);
    const ingridentRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterTesteId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    expect(inputSearch).toBeInTheDocument();
    expect(ingridentRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnPesquisar).toBeInTheDocument();

    userEvent.type(inputSearch, 'rice');
    userEvent.click(ingridentRadio);
    userEvent.click(btnPesquisar);

    expect(fetch).toHaveBeenCalled();

    userEvent.type(inputSearch, 'corba');
    userEvent.click(nameRadio);
    userEvent.click(btnPesquisar);

    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se o fetch é feito após clicar no botão drinks ', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinkIngredients),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(inputTestId);
    const ingridentRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(nameRadioTestId);
    const firstLetterRadio = screen.getByTestId(firstLetterTesteId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    expect(inputSearch).toBeInTheDocument();
    expect(ingridentRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnPesquisar).toBeInTheDocument();

    userEvent.type(inputSearch, 'A1');
    userEvent.click(nameRadio);
    userEvent.click(btnPesquisar);

    expect(fetch).toHaveBeenCalled();

    userEvent.type(inputSearch, 'gin');
    userEvent.click(ingridentRadio);
    userEvent.click(btnPesquisar);

    expect(fetch).toHaveBeenCalled();
  });
  it('testando se aparece a alert Meals', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(inputTestId);
    const letter = screen.getByTestId(firstLetterTesteId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    userEvent.type(inputSearch, 'aa');
    userEvent.click(letter);
    userEvent.click(btnPesquisar);

    await waitFor(() => {
      expect(global.alert).toBeCalled();
    });
  });
  it('testando se aparece a alert Drinks', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    const iconSearch = screen.getByTestId(searchTestId);
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(inputTestId);
    const letter = screen.getByTestId(firstLetterTesteId);
    const btnPesquisar = screen.getByTestId(btnPesquisarTestId);

    userEvent.type(inputSearch, 'Aa');
    userEvent.click(letter);
    userEvent.click(btnPesquisar);

    await waitFor(() => {
      expect(global.alert).toBeCalled();
    });
  });
});
