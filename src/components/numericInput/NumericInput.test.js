import { render, fireEvent } from '@testing-library/react';
import NumericInput from './NumericInput';

describe('NumericInput', () => {
  const title = 'Name';
  const value = 100;
  const onChange = jest.fn();

  it('Test to see if a numericInput with title and value is rendered', () => {
    const { getByLabelText } = render(
      <NumericInput title={title} value={value} onChange={onChange} />
    );

    const numericInput = getByLabelText(title);
    expect(numericInput).toHaveValue(value);
  });

  it('Test to see if onChange is called when the numericInput value changes', () => {
    const { getByLabelText } = render(
      <NumericInput title={title} value={value} onChange={onChange} />
    );

    const numericInput = getByLabelText(title);
    fireEvent.change(numericInput, { target: { value: 101 } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
