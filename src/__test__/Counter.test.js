import React from 'react';
import renderer from 'react-test-renderer';
import Counter from '../Counter';
describe('Counter', () => {
  it('snapshot renders', () => {
    const component = renderer.create(<Counter counter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('snapshot renders 2', () => {
    const component = renderer.create(<Counter counter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
