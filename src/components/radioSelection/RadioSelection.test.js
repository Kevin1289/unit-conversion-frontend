import { render, fireEvent } from '@testing-library/react';
import RadioSelection from './RadioSelection';

describe('Selection', () => {
  const options = ['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine'];
  const selectedOption = 'Kelvin';
  const title = 'Title';
  const dataTestId = 'testID';
  const onChange = jest.fn();

  it('renders a list of radio buttons with options', () => {
    const { getByTestId } = render(
      <RadioSelection
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
        title={title}
        dataTestId={dataTestId}
      />
    );

    options.forEach((option) => {
      const radio = getByTestId(dataTestId + option);
      expect(radio).toBeInTheDocument();
    });
  });

  it('calls onChange handler when a radio button is selected', () => {
    const { getByTestId } = render(
      <RadioSelection
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
        title={title}
        dataTestId={dataTestId}
      />
    );
    const newSelectionId = dataTestId + 'Celsius';
    const newSelectionRadio = getByTestId(newSelectionId);
    expect(newSelectionRadio.checked).toEqual(false);
    fireEvent.click(newSelectionRadio);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
