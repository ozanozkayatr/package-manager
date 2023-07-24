import React from "react";

const NumBox = ({ label, placeholder, onChange, value }) => {
  const handleChange = (event) => {
    const inputValue = event.target.value || "0";
    onChange(inputValue);
  };

  return (
    <div className="num-box-container">
      <label className="num-box-label">{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        className="num-box-input"
        onChange={handleChange}
        value={value} // Use the preset value if available
      />
    </div>
  );
};

export default NumBox;
