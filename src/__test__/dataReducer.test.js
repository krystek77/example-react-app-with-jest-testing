import { dataReducer } from '../App';
describe('App', () => {
  describe('dataReducer', () => {
    it('should set the data', () => {
      const list = ['item1', 'item2', 'item3'];
      const state = { list: [], error: null, isLoading: false };
      const newState = dataReducer(state, { type: 'SET_LIST', data: list });
      expect(newState).toEqual({ list, error: null, isLoading: false });
    });
    it('shoulds reset error when list is set', () => {
      const list = ['item1', 'item2', 'item3'];
      const state = { list: [], error: { message: '' } };
      const newState = dataReducer(state, { type: 'SET_LIST', data: list });
      expect(newState).toEqual({ list, error: null, isLoading: false });
    });
    it('shoulds reset isLoading when list has already loaded', () => {
      const list = ['item1', 'item2', 'item3'];
      const state = { list: [], error: null, isLoading: true };
      const newState = dataReducer(state, { type: 'SET_LIST', data: list });
      expect(newState).toEqual({ list, error: null, isLoading: false });
    });
    it('shoulds set an error', () => {
      const list = ['item1', 'item2', 'item3'];
      const state = { list: [], error: null, isLoading: false };
      const newState = dataReducer(state, {
        type: 'SET_ERROR',
        error: { message: 'Operation not allowed' },
      });
      expect(newState).toEqual({
        list: [],
        error: { message: 'Operation not allowed' },
        isLoading: false,
      });
    });
  });
});
