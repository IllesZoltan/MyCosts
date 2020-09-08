import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('App class is there', () => {

  const Apps = document.getElementsByClassName('App')

  expect(Apps[0]).toBeInTheDocument();
});
