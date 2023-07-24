import React from "react";

const SelectBox = ({ label, options = [], onChange }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value || "0";
    onChange(selectedValue);
  };

  return (
    <div className="select-box-container">
      <label className="select-box-label">{label}</label>
      <select className="select-box-input" onChange={handleChange}>
        <option value="">Please Select</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
