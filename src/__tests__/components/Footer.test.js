import { render } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  test('Show Correct year in footer', () => {
    const currentYear = new Date().getFullYear();
    const { getByText } = render(<Footer />);
    expect(
      getByText(`Village Book Builders ©${currentYear} | All Rights Reserved`)
    ).toBeTruthy();
  });
});
