import React from 'react';
import App from './App';

describe('App', () => {
  it('exists', () => {
    let t = <App fakeProp="foo" />;
    expect(t.props).toEqual({ fakeProp: 'foo' });
  });
});
