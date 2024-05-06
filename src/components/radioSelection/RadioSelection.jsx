import React from 'react';
import PropTypes from 'prop-types';

const RadioSelection = ({ options, selectedOption, onChange, title, dataTestId }) => {
  return (
    <div className="RadioSelection-container">
      <label htmlFor={title}>{title}</label>
      <br />
      {options.map((option) => (
        <div key={dataTestId + option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={onChange}
            id={dataTestId + option}
            data-testid={dataTestId + option}
          />
          <label htmlFor={dataTestId + option}>{option}</label>
          <br />
        </div>
      ))}
    </div>
  );
};

RadioSelection.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default RadioSelection;
