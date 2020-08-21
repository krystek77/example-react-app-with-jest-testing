import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import validData from '../__mocks__/validData.json';
import { dataReducer } from '../App';
import App from '../App';
import { act } from 'react-dom/test-utils';
// import { act } from 'react-dom/test-utils';
jest.mock('axios');

describe('App', () => {
  it('shoulds return list from 3rd part API', () => {
    const state = { list: [], error: null, isLoading: false };
    const newState = dataReducer(state, {
      type: 'SET_LIST',
      data: validData.hits,
    });
    expect(newState).toEqual({
      list: validData.hits,
      error: null,
      isLoading: false,
    });
  });
  it('returns list items', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: validData });
    });
    render(<App />);
    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(20);
  });
  it('returns an error when wrong url passed', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.reject({ message: 'Network Error' });
    });
    const { findByText } = render(<App />);
    expect(await findByText(/Network Error/i)).toBeInTheDocument();
    // screen.debug();
  });
});
