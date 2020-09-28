import React from 'react';
import { render, screen, us } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import App from '../App';

import cities from '../constants/cities';

const setup = (initialPath = '/') => {
  let history, location;

  const app = (
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
      <Route
        path="*"
        render={(props) => {
          history = props.history;
          location = props.location;
          return null;
        }}
      />
    </MemoryRouter>
  );

  render(app);
  return { history, location };
};

describe('Hero', () => {
  describe('title link', () => {
    test('it renders', () => {
      setup();
      expect(screen.getByRole('heading', { name: /javascript jobs/i })).toBeInTheDocument();
    });

    test('links to current city', () => {
      setup('/melbourne');
      expect(screen.getByRole('link', { name: /javascript jobs/i })).toHaveAttribute(
        'href',
        '/melbourne',
      );
    });
  });

  describe('form', () => {
    test('it renders', () => {
      setup();
      expect(screen.getByRole('textbox', { name: /keyword input/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /search keyword/i })).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: /select city/i })).toBeInTheDocument();
    });

    test('on type, it updates', () => {
      setup();
      const input = screen.getByRole('textbox', { name: /keyword input/i });
      expect(input).toHaveValue('');

      userEvent.type(input, 'test');

      expect(input).toHaveValue('test');
    });

    test('dropdown has the right options', () => {
      setup();

      cities.forEach((city) => {
        const cityRegex = new RegExp(city, 'i');
        expect(screen.getByRole('option', { name: cityRegex })).toBeInTheDocument();
      });
    });

    test('on option select, navigates to that city url', async () => {
      const { history } = setup();

      const combobox = screen.getByRole('combobox', { name: /select city/i });
      const sydney = screen.getByRole('option', { name: /sydney/i });
      const melbourne = screen.getByRole('option', { name: /melbourne/i });
      expect(history.location.pathname).toBe('/sydney');
      expect(sydney.selected).toBe(true);
      expect(melbourne.selected).toBe(false);

      userEvent.selectOptions(combobox, ['melbourne']);

      expect(history.location.pathname).toBe('/melbourne');
      expect(melbourne.selected).toBe(true);
      expect(sydney.selected).toBe(false);

      userEvent.selectOptions(combobox, ['sydney']);

      expect(history.location.pathname).toBe('/sydney');
      expect(melbourne.selected).toBe(false);
      expect(sydney.selected).toBe(true);
    });
  });
});
