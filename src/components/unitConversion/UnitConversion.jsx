import React from 'react';
import RadioSelection from '../radioSelection/RadioSelection';
import NumericInput from '../numericInput/NumericInput';
import './UnitConversion.css';

const REACT_APP_API_URL =
  process.env.REACT_APP_API_URL || 'http://kw-unit-conversion.us-east-1.elasticbeanstalk.com';

// enum for correct, incorrect, and invalid
const Status = {
  CORRECT: 'Correct',
  INCORRECT: 'Incorrect',
  INVALID: 'Invalid'
};

const UnitConversion = () => {
  const conversionTypes = ['Temperature', 'Volume'];
  const temperatureUnits = ['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine'];
  const volumeUnits = ['Liters', 'Tablespoons', 'Cubic-Inches', 'Cups', 'Cubic-Feet', 'Gallons'];
  const [conversionType, setConversionType] = React.useState('Temperature');
  const [inputValue, setInputValue] = React.useState(0);
  const [inputUnit, setInputUnit] = React.useState('Kelvin');
  const [targetUnit, setTargetUnit] = React.useState('Celsius');
  const [studentResponse, setStudentResponse] = React.useState(0);
  const [conversionOutput, setConversionOutput] = React.useState(undefined);
  const [showGuide, setShowGuide] = React.useState(false);

  const handleConversionTypeChange = (event) => {
    const newConversionType = event.target.value;
    setConversionType(newConversionType);
    setInputUnit(newConversionType === 'Temperature' ? 'Kelvin' : 'Liters');
    setTargetUnit(newConversionType === 'Temperature' ? 'Celsius' : 'Tablespoons');
  };

  const handleInputChange = (event) => {
    const numberVal = parseFloat(event.target.value);
    if (isNaN(numberVal)) {
      setInputValue(0);
      return;
    }
    setInputValue(numberVal);
  };

  const handleInputUnitChange = (event) => {
    setInputUnit(event.target.value);
  };

  const handleTargetUnitChange = (event) => {
    setTargetUnit(event.target.value);
  };

  const handleStudentResponseChange = (event) => {
    const numberVal = parseFloat(event.target.value);
    if (isNaN(numberVal)) {
      setStudentResponse(0);
      return;
    }
    setStudentResponse(numberVal);
  };

  const checkAnswer = async () => {
    const response = await fetch(
      `${REACT_APP_API_URL}/unitconversion?type=${conversionType.toLowerCase()}&value=${inputValue}&unit=${inputUnit.toLowerCase()}&target=${targetUnit.toLowerCase()}&response=${studentResponse}`
    );
    const data = await response.json();
    if (data.status === 'CORRECT') {
      setConversionOutput(Status.CORRECT);
    } else if (data.status === 'INCORRECT') {
      setConversionOutput(Status.INCORRECT);
    } else {
      setConversionOutput(Status.INVALID);
    }
  };

  const Guide = () => {
    return (
      <div data-testid="GuideText">
        <h2>Guide</h2>
        <p>1. Select the conversion type (Temperature or Volume).</p>
        <p>2. Enter the input numerical value in &quot;Input Numerical Value&quot;</p>
        <p>3. Select the input unit of measure.</p>
        <p>4. Select the target unit of measure.</p>
        <p>5. Enter the student response output in &quot;Student Response Output&quot;</p>
        <p>6. Click the &quot;Check Answer&quot; button to see the result.</p>
      </div>
    );
  };

  return (
    <div
      className={`container ${`background-${conversionOutput?.toLowerCase()}`}`}
      data-testid="UnitConversion"
    >
      <h1>Unit Conversion</h1>
      <RadioSelection
        title="Conversion Type"
        options={conversionTypes}
        selectedOption={conversionType}
        onChange={handleConversionTypeChange}
        dataTestId="ConversionType"
      />
      <br />
      <NumericInput
        title="Input Numerical Value"
        value={inputValue}
        onChange={handleInputChange}
        dataTestId="InputValue"
      />
      <br />
      <RadioSelection
        title="Input Unit"
        options={conversionType === 'Temperature' ? temperatureUnits : volumeUnits}
        selectedOption={inputUnit}
        onChange={handleInputUnitChange}
        dataTestId="InputUnit"
      />
      <br />
      <RadioSelection
        title="Target Unit"
        options={conversionType === 'Temperature' ? temperatureUnits : volumeUnits}
        selectedOption={targetUnit}
        onChange={handleTargetUnitChange}
        dataTestId="TargetUnit"
      />
      <br />
      <NumericInput
        title="Student Response Output"
        value={studentResponse}
        onChange={handleStudentResponseChange}
        dataTestId="StudentResponse"
      />
      <br />
      <button
        onClick={checkAnswer}
        disabled={!inputValue || !studentResponse}
        data-testid="CheckAnswer"
      >
        Check Answer
      </button>

      {conversionOutput && (
        <div data-testid="ConversionOutput">
          Result: <b>{conversionOutput}</b>
        </div>
      )}
      <br />
      <button onClick={() => setShowGuide(!showGuide)} data-testid="GuideButton">
        {showGuide ? 'Hide Guide' : 'Show Guide'}
      </button>

      {showGuide && <Guide />}
    </div>
  );
};

export default UnitConversion;
