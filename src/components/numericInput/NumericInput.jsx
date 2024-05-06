import React from 'react';
import PropTypes from 'prop-types';
import './NumericInput.css';

const NumericInput = ({ title, value, onChange, dataTestId }) => {
  return (
    <div className="numericInput-container">
      <label>
        {title}
        <br />
        <input type="number" value={value} onChange={onChange} data-testid={dataTestId} />
      </label>
    </div>
  );
};

NumericInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default NumericInput;
