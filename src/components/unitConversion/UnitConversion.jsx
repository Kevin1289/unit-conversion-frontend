import React from 'react';
import RadioSelection from '../radioSelection/RadioSelection';
import NumericInput from '../numericInput/NumericInput';
import './UnitConversion.css';

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
    // parse to number. can be a float
    setInputValue(parseFloat(event.target.value));
  };

  const handleInputUnitChange = (event) => {
    setInputUnit(event.target.value);
  };

  const handleTargetUnitChange = (event) => {
    setTargetUnit(event.target.value);
  };

  const handleStudentResponseChange = (event) => {
    setStudentResponse(parseFloat(event.target.value));
  };

  const checkAnswer = async () => {
    const response = await fetch(
      `${
        process.env.REACT_APP_SERVER_HOST
      }/unitconversion?type=${conversionType.toLowerCase()}&value=${inputValue}&unit=${inputUnit.toLowerCase()}&target=${targetUnit.toLowerCase()}&response=${studentResponse}`
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
      <div>
        <h2>Guide</h2>
        <p>1. Select the conversion type (Temperature or Volume).</p>
        <p>2. Enter the numerical value in the &quot;Input Numerical Value&quot; numericInput.</p>
        <p>3. Select the input unit of measure.</p>
        <p>4. Select the target unit of measure.</p>
        <p>5. The student response output will be displayed based on the conversion.</p>
      </div>
    );
  };

  return (
    <div className={`container ${`background-${conversionOutput?.toLowerCase()}`}`}>
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
        // eslint-disable-next-line prettier/prettier
        data-testid="CheckAnswer"
      >
        Check Answer
      </button>

      {conversionOutput && (
        <p>
          Result: <b>{conversionOutput}</b>
        </p>
      )}
      <br />
      <button onClick={() => setShowGuide(!showGuide)}>
        {showGuide ? 'Hide Guide' : 'Show Guide'}
      </button>

      {showGuide && <Guide />}
    </div>
  );
};

export default UnitConversion;
