import PropTypes from 'prop-types'

export default function InputField({ label, value, onChange, placeholder }) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) {
      onChange(e)
    }
  }

  return (
    <div className="text-3xl">
      <label className="text-stone-300">{label}:</label>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-20 bg-transparent text-blue-400"
      />
    </div>
  )
}

// Validação das props
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
