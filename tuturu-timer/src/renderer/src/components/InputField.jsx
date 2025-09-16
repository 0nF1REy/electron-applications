import PropTypes from 'prop-types'

export default function InputField({ label, value, onChange }) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    if (/^\d*$/.test(inputValue)) {
      onChange(e)
    }
  }

  return (
    <div className="font-digital text-2xl flex items-center justify-between my-1">
      <label className="text-amber pr-4">{label}:</label>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="w-24 bg-amber-dark text-amber text-center border border-amber focus:outline-none focus:ring-2 focus:ring-amber"
      />
    </div>
  )
}

// Validação das props
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired
}
