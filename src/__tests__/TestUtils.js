import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import store from '../redux/store';

export const MockRedux = ({ children }) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);

export const MockStripe = ({ children }) => (
  <Elements stripe={loadStripe('pk_live_nKWeX2hm4oX0Nz3JqpZyyvix')}>
    {children}
  </Elements>
);

describe('test utils', () => {
  const FakeComponent = () => <div>Worldly Hellos</div>;
  it('Mock Redux renders children', () => {
    const { getByText } = render(
      <MockRedux>
        <FakeComponent />
      </MockRedux>
    );
    expect(getByText('Worldly Hellos')).toBeTruthy();
  });
  it('Mock stripe renders children', () => {
    const { getByText } = render(
      <MockStripe>
        <FakeComponent />
      </MockStripe>
    );
    expect(getByText('Worldly Hellos')).toBeTruthy();
  });
});
