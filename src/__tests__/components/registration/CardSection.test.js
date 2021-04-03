import { render } from '@testing-library/react';
import CardSection from '../../../components/registration/CardSection';
import { MockStripe } from '../../TestUtils';

describe('CardSection', () => {
  test('renders', () => {
    const { getByText } = render(
      <MockStripe>
        <CardSection />
      </MockStripe>
    );
    expect(getByText(`Card details`)).toBeTruthy();
  });
});
