import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Ops from './ops';
import {configureStore} from '../../store';
describe('EmailOps component', () => {
  const setUpFn = (emailAction:string) => {
    const store = configureStore();
  
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
    
    return render(<Provider store={store}>
      <BrowserRouter>
      <Ops selectedAction = {emailAction}/>
      </BrowserRouter>
    </Provider>);
  };

  let wrapper:any;
  beforeAll(() => {
    wrapper = setUpFn('inbox');
  });

  test('on render', () => {    
    const { getByText } = wrapper;
    expect(getByText('Inbox')).toBeInTheDocument();
    expect(getByText('Send email')).toBeInTheDocument();
  })

})