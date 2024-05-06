import PropTypes from 'prop-types';
import './NumericInput.css';

const NumericInput = ({ title, value, onChange, dataTestId }) => {
  return (
    <div className="numericInput-container">
      <label>
        {title}
        <br />
        <input
          type="number"
          step="any"
          value={value}
          onChange={onChange}
          data-testid={dataTestId}
        />
      </label>
    </div>
  );
};

NumericInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default NumericInput;
