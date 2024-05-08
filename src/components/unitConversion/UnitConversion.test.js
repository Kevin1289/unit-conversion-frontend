import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UnitConversion from './UnitConversion';

describe('UnitConversion', () => {
  const volumeUnits = ['Liters', 'Tablespoons', 'Cubic-Inches', 'Cups', 'Cubic-Feet', 'Gallons'];

  it('Test to see if the UnitConversion component renders', () => {
    render(<UnitConversion />);
  });

  it('Test to see if the conversion type updates when changed', () => {
    const { getByTestId } = render(<UnitConversion />);
    const volumeRadioButton = getByTestId('ConversionTypeVolume');
    expect(volumeRadioButton.checked).toEqual(false);

    fireEvent.click(volumeRadioButton);

    const inputRadioButton = getByTestId('InputUnitLiters');
    const targetRadioButton = getByTestId('TargetUnitTablespoons');

    expect(volumeRadioButton.checked).toEqual(true);
    expect(inputRadioButton.checked).toEqual(true);
    expect(targetRadioButton.checked).toEqual(true);
  });

  it('Test to see if the input units update when conversion type changes', () => {
    const { getByTestId } = render(<UnitConversion />);
    const volumeRadioButton = getByTestId('ConversionTypeVolume');

    fireEvent.click(volumeRadioButton);

    volumeUnits.forEach((unit) => {
      const unitRadioButton = getByTestId(`InputUnit${unit}`);
      expect(unitRadioButton).toBeInTheDocument();
    });
  });

  it('Test to see if the input numeric value updates when changed', () => {
    const { getByTestId } = render(<UnitConversion />);
    const numericInput = getByTestId('InputValue');

    fireEvent.change(numericInput, { target: { value: 'text' } });

    expect(numericInput).toHaveValue(0);
  });

  it('Test to see if the input numeric value resets to 0 when ', () => {
    const { getByTestId } = render(<UnitConversion />);
    const numericInput = getByTestId('InputValue');

    fireEvent.change(numericInput, { target: { value: 100 } });

    expect(numericInput).toHaveValue(100);
  });

  it('Test to see if the input numeric value updates when changed', () => {
    const { getByTestId } = render(<UnitConversion />);
    const numericInput = getByTestId('StudentResponse');

    fireEvent.change(numericInput, { target: { value: 'text' } });

    expect(numericInput).toHaveValue(0);
  });

  // check if the target unit value updates when clicked
  it('Test to see if the input unit value updates when clicked', () => {
    const { getByTestId } = render(<UnitConversion />);
    const inputRadioButton = getByTestId('InputUnitRankine');

    expect(inputRadioButton.checked).toEqual(false);

    fireEvent.click(inputRadioButton);

    expect(inputRadioButton.checked).toEqual(true);
  });

  // check if the target unit value updates when clicked
  it('Test to see if the target unit value updates when clicked', () => {
    const { getByTestId } = render(<UnitConversion />);
    const targetRadioButton = getByTestId('TargetUnitRankine');

    expect(targetRadioButton.checked).toEqual(false);

    fireEvent.click(targetRadioButton);

    expect(targetRadioButton.checked).toEqual(true);
  });

  // check if the target unit value updates when clicked
  it('Test to see if the target unit value updates when clicked', () => {
    const { getByTestId } = render(<UnitConversion />);
    const targetRadioButton = getByTestId('TargetUnitRankine');

    expect(targetRadioButton.checked).toEqual(false);

    fireEvent.click(targetRadioButton);

    expect(targetRadioButton.checked).toEqual(true);
  });

  // check if the student response updates when changed
  it('Test to see if the student response updates when changed', () => {
    const { getByTestId } = render(<UnitConversion />);
    const studentResponseNumericInput = getByTestId('StudentResponse');

    fireEvent.change(studentResponseNumericInput, { target: { value: 100 } });

    expect(studentResponseNumericInput).toHaveValue(100);
  });

  it('Test to see if Check Answer button disables when text input is empty', () => {
    const { getByTestId } = render(<UnitConversion />);
    const checkAnswerButton = getByTestId('CheckAnswer');

    expect(checkAnswerButton).toBeDisabled();
  });

  it('Test to see if Correct answer check updates Result', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'CORRECT' })
      })
    );

    const { getByTestId, getByText } = render(<UnitConversion />);
    const numericInput = getByTestId('InputValue');
    const responseNumericInput = getByTestId('StudentResponse');
    const checkAnswerButton = getByTestId('CheckAnswer');

    fireEvent.change(numericInput, { target: { value: 10 } });
    fireEvent.change(responseNumericInput, { target: { value: -263.15 } });
    fireEvent.click(checkAnswerButton);

    await waitFor(() => expect(getByText('Correct')).toBeInTheDocument());
  });

  it('Test to see if Incorrect answer check updates Result', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'INCORRECT' })
      })
    );

    const { getByTestId, getByText } = render(<UnitConversion />);
    const numericInput = getByTestId('InputValue');
    const responseNumericInput = getByTestId('StudentResponse');
    const checkAnswerButton = getByTestId('CheckAnswer');

    fireEvent.change(numericInput, { target: { value: 11 } });
    fireEvent.change(responseNumericInput, { target: { value: -263.15 } });
    fireEvent.click(checkAnswerButton);

    await waitFor(() => expect(getByText('Incorrect')).toBeInTheDocument());
  });

  it('Test to see if Invalid answer check updates Result', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'INVALID' })
      })
    );

    const { getByTestId, getByText } = render(<UnitConversion />);
    const numericInput = getByTestId('InputValue');
    const responseNumericInput = getByTestId('StudentResponse');
    const checkAnswerButton = getByTestId('CheckAnswer');

    fireEvent.change(numericInput, { target: { value: 11 } });
    fireEvent.change(responseNumericInput, { target: { value: -263.15 } });
    fireEvent.click(checkAnswerButton);

    await waitFor(() => expect(getByText('Invalid')).toBeInTheDocument());
  });

  it('Test to see if Check Answer button enables when text input is not empty', () => {
    const { getByTestId } = render(<UnitConversion />);
    const numericInput = getByTestId('InputValue');
    const studentResponseNumericInput = getByTestId('StudentResponse');
    const checkAnswerButton = getByTestId('CheckAnswer');

    fireEvent.change(numericInput, { target: { value: 100 } });
    fireEvent.change(studentResponseNumericInput, { target: { value: 100 } });

    expect(checkAnswerButton).not.toBeDisabled();
  });

  it('Test to see if Guide button toggles visibility of guide', () => {
    const { getByTestId } = render(<UnitConversion />);
    const guideButton = getByTestId('GuideButton');

    let GuideText = screen.queryAllByTestId('GuideText');
    expect(GuideText).toHaveLength(0);
    fireEvent.click(guideButton);

    GuideText = screen.queryAllByTestId('GuideText');
    expect(GuideText).toHaveLength(1);
    fireEvent.click(guideButton);

    GuideText = screen.queryAllByTestId('GuideText');
    expect(GuideText).toHaveLength(0);
  });
});
