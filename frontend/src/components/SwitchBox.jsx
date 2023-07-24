import React from "react";
import Switch from "react-switch";

const SwitchBox = ({ label, onChange }) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
    const value = checked ? "1" : "0";
    onChange(value); // Pass the label and value ("0" or "1") to the onChange callback
  };

  return (
    <div className="switch-box">
      <label className="switch-box-label">{label}</label>
      <label htmlFor="material-switch">
        <Switch
          checked={checked}
          onChange={handleChange}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </label>
    </div>
  );
};

export default SwitchBox;
