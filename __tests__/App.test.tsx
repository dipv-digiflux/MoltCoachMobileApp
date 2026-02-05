/**
 * App root component test.
 * @format
 */

import React from 'react';
import TestRenderer from 'react-test-renderer';

import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    let root: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      root = TestRenderer.create(<App />);
    });
    expect(root!).toBeDefined();
  });
});
