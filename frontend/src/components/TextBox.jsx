import React from "react";

const TextBox = ({ label, placeholder, onChange }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value || "0";
    onChange(inputValue);
  };

  return (
    <div className="text-box-container">
      <label className="text-box-label">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="text-box-input"
        onChange={handleChange}
      />
    </div>
  );
};

export default TextBox;
