import { render, fireEvent } from "@testing-library/react";
import UnitConversion from "./UnitConversion";

describe("UnitConversion", () => {
  const volumeUnits = [
    "Liters",
    "Tablespoons",
    "Cubic-Inches",
    "Cups",
    "Cubic-Feet",
    "Gallons",
  ];

  it("Test to see if the UnitConversion component renders", () => {
    render(<UnitConversion />);
  });

  it("Test to see if the input units update when conversion type changes", () => {
    const { getByTestId } = render(<UnitConversion />);
    const volumeRadioButton = getByTestId("ConversionTypeVolume");
    fireEvent.click(volumeRadioButton);
    volumeUnits.forEach((unit) => {
      const unitRadioButton = getByTestId(`InputUnit${unit}`);
      expect(unitRadioButton).toBeInTheDocument();
    });
  });

  it("Test to see if the input numeric value updates when changed", () => {
    const { getByTestId } = render(<UnitConversion />);
    const inputNumericInput = getByTestId("InputValue");
    fireEvent.change(inputNumericInput, { target: { value: 100 } });
    expect(inputNumericInput).toHaveValue(100);
  });

  // check if the input unit value updates when clicked
  it("Test to see if the input unit value updates when clicked", () => {
    const { getByTestId } = render(<UnitConversion />);
    const inputRadioButton = getByTestId("InputUnitCelsius");
    expect(inputRadioButton.checked).toEqual(false);
    fireEvent.click(inputRadioButton);
    expect(inputRadioButton.checked).toEqual(true);
  });

  // check if the target unit value updates when clicked
  it("Test to see if the target unit value updates when clicked", () => {
    const { getByTestId } = render(<UnitConversion />);
    const targetRadioButton = getByTestId("TargetUnitRankine");
    expect(targetRadioButton.checked).toEqual(false);
    fireEvent.click(targetRadioButton);
    expect(targetRadioButton.checked).toEqual(true);
  });

  // check if the student response updates when changed
  it("Test to see if the student response updates when changed", () => {
    const { getByTestId } = render(<UnitConversion />);
    const studentResponseNumericInput = getByTestId("StudentResponse");
    fireEvent.change(studentResponseNumericInput, { target: { value: 100 } });
    expect(studentResponseNumericInput).toHaveValue(100);
  });

  it("Test to see if Check Answer button disables when text input is empty", () => {
    const { getByTestId } = render(<UnitConversion />);
    const checkAnswerButton = getByTestId("CheckAnswer");
    expect(checkAnswerButton).toBeDisabled();
  });

  it("Test to see if Check Answer button enables when text input is not empty", () => {
    const { getByTestId } = render(<UnitConversion />);
    const inputNumericInput = getByTestId("InputValue");
    const studentResponseNumericInput = getByTestId("StudentResponse");
    const checkAnswerButton = getByTestId("CheckAnswer");
    fireEvent.change(inputNumericInput, { target: { value: 100 } });
    fireEvent.change(studentResponseNumericInput, { target: { value: 100 } });
    expect(checkAnswerButton).not.toBeDisabled();
  });
});
