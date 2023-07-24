import React, { useState, useEffect } from "react";
import "../PeriodicMessage.css";

const PeriodicMessage = ({
  selectedSet,
  formValues,
  addPeriodicMessage,
  removePeriodicMessage,
  periodicMessages,
  setPeriodicMessages,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [messagesPerSecond, setMessagesPerSecond] = useState(1);

  const toggleIsActive = () => {
    if (isActive) {
      removePeriodicMessage(selectedSet);
    } else {
      addPeriodicMessage(selectedSet, formValues, messagesPerSecond);
    }
    setIsActive(!isActive);
  };

  const handleMessagesPerSecondChange = (event) => {
    const newMessagesPerSecond = parseInt(event.target.value, 10);
    setMessagesPerSecond(newMessagesPerSecond);

    if (isActive) {
      removePeriodicMessage(selectedSet);
      addPeriodicMessage(selectedSet, formValues, newMessagesPerSecond);
    }
  };

  const handleReset = () => {
    periodicMessages.forEach(({ set }) => {
      removePeriodicMessage(set);
    });
    setPeriodicMessages([]);
    setIsActive(false);
    setMessagesPerSecond(1);
  };

  useEffect(() => {
    const isSetActive = periodicMessages.some(
      (message) => message.set === selectedSet
    );
    setIsActive(isSetActive);
  }, [selectedSet, periodicMessages]);

  return (
    <div className="periodic-message-container">
      <div className="checkbox-container">
        <label htmlFor="checkbox">Periodic</label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={toggleIsActive}
          id="checkbox"
        />
      </div>
      {isActive && (
        <div className="slider-container">
          <label htmlFor="messagesPerSecond">
            Messages per second: {messagesPerSecond}
          </label>
          <input
            type="range"
            min="1"
            max="60"
            value={messagesPerSecond}
            className="slider"
            id="messagesPerSecond"
            onChange={handleMessagesPerSecondChange}
          />
        </div>
      )}
      {periodicMessages.length > 0 && (
        <button onClick={handleReset}>Reset</button>
      )}
    </div>
  );
};

export default PeriodicMessage;
