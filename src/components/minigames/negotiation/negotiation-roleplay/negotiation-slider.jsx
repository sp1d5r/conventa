import React, { useState } from "react";

function NegotiationSlider({ label, min, max, onChange }) {
  const [value, setValue] = useState(min);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="negotiation-slider">
      <label htmlFor={`${label}-slider`}>{label}</label>
      <input
        type="range"
        id={`${label}-slider`}
        name={`${label}-slider`}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <span>{value}</span>
    </div>
  );
}

export default NegotiationSlider;
