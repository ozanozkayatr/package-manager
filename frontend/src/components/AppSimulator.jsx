import React, { useState, useEffect, useRef } from "react";
import "../Simulator.css";
import TextBox from "./TextBox";
import NumBox from "./NumBox";
import SwitchBox from "./SwitchBox";
import SelectBox from "./SelectBox";
import PeriodicMessage from "./PeriodicMessage";
import data from "./Devices/Device1.json";
import data2 from "./Devices/Device2.json";
import data3 from "./Devices/Device3.json";
import data4 from "./Devices/Device4.json";
import homeIcon from "../homeIcon.png";
import "../MessageTrain.css";
import "../PeriodicMessage.css";
import Settings from "./Settings";
import settingsIcon from "../settingsIcon.png";

const AppSimulator = () => {
  const componentMap = {
    text: TextBox,
    number: NumBox,
    toggle: SwitchBox,
    select: SelectBox,
  };

  const dataSetMap = {
    "Device 1": data,
    "Device 2": data2,
    "Device 3": data3,
    "Device 4": data4,
  };

  const [jsonData, setJsonData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [selectedSet, setSelectedSet] = useState(null);
  const [checksum, setChecksum] = useState(false);
  const [radioSelection, setRadioSelection] = useState("");
  const [radioSelectionMode, setRadioSelectionMode] = useState(false);
  const [periodicMessages, setPeriodicMessages] = useState([]);
  const intervals = useRef([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  const getMessageAnimationStyle = (speed) => {
    const animationDuration = 3 / speed; // Adjust the scaling factor as needed
    return {
      animation: `pulse ${animationDuration}s infinite`,
    };
  };

  const handleChange = (label, inputValue) => {
    const value = inputValue.toString();

    if (value.startsWith("0x")) {
      const hexValue = value.slice(2);
      const parsedValue = parseInt(hexValue, 16);
      setFormValues((prevValues) => ({
        ...prevValues,
        [label]: parsedValue,
      }));
    } else {
      const parsedValue = parseInt(value, 10);
      setFormValues((prevValues) => ({
        ...prevValues,
        [label]: parsedValue,
      }));
    }
  };

  const handleFormSubmit = async () => {
    if (!selectedSet) {
      alert("Please Select a Message");
      return;
    }

    const orderedFormValues = selectedSet.components.map((item) => {
      let value;
      if (item.type === "hidden") {
        value = item.value || 0;
      } else if (item.type === "select") {
        const selectedOption = formValues[item.label];
        value = selectedOption ? selectedOption : 0;
      } else {
        value = formValues[item.label] || 0;
      }

      return {
        label: item.label,
        value: value,
        bytes: item.bytes,
      };
    });

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uiSets: orderedFormValues,
          checksum: jsonData.checksum,
        }), // Wrap the values inside a dictionary
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => {}, 1000);
    }
  };

  const returnToHomepage = () => {
    setRadioSelection("");
    setJsonData(null);
    setRadioSelectionMode(false);
    // Stop any periodic messages when returning to the homepage
    periodicMessages.forEach(({ interval }) => clearInterval(interval));
    setPeriodicMessages([]);
  };

  const handleSetChange = (event) => {
    const setName = event.target.value;
    const newSet = jsonData.uiSets.find((set) => set.name === setName);
    setSelectedSet(newSet);

    // Initializing formValues with default values
    const initialValues = newSet.components.reduce((values, item) => {
      if (item.type === "text" || item.type === "number") {
        values[item.label] = item.value || 0;
      }
      return values;
    }, {});
    setFormValues(initialValues);
  };

  const addPeriodicMessage = (set, values, messagesPerSecond) => {
    const interval = setInterval(() => {
      handleFormSubmit();
    }, 1000 / messagesPerSecond);
    intervals.current.push(interval);
    setPeriodicMessages((prevMessages) => [
      ...prevMessages,
      { set, values, interval, dataset: radioSelection },
    ]);
    setSentMessages((prevMessages) => [
      ...prevMessages,
      { name: set.name, speed: messagesPerSecond, dataset: radioSelection },
    ]);
  };

  const removeMessage = (setName) => {
    setSentMessages((prevMessages) =>
      prevMessages.filter((message) => message.name !== setName)
    );
  };

  const removePeriodicMessage = (set) => {
    const messageIndex = periodicMessages.findIndex(
      (message) => message.set === set
    );
    if (messageIndex !== -1) {
      clearInterval(periodicMessages[messageIndex].interval);
      const newMessages = [...periodicMessages];
      newMessages.splice(messageIndex, 1);
      setPeriodicMessages(newMessages);
      removeMessage(set.name);
    }
  };

  useEffect(() => {
    setSelectedSet(null);
    setFormValues({});
    setChecksum(false);
  }, [jsonData]);

  return (
    <div className="whole-container">
      <div className="message-train">
        {sentMessages.map((message, index) => (
          <div
            key={index}
            className="message-train-item"
            style={getMessageAnimationStyle(message.speed)}
          >
            <span className="bold-span">{message.dataset}</span>
            <span> {message.name}</span>
            <span>{message.speed} Hz</span>
          </div>
        ))}
      </div>

      {showSettings && (
        <Settings
          closeSettings={() => setShowSettings(false)}
          applySettings={() => {
            setShowSettings(false);
          }}
        />
      )}

      <div className={`app-simulator-container ${showSettings ? "hide" : ""}`}>
        <div className="header-contrainer">
          <img
            src={homeIcon}
            alt="Home Icon"
            onClick={returnToHomepage}
            className="home-button"
          />

          <span className="settings-btn" onClick={() => setShowSettings(true)}>
            <img
              src={settingsIcon}
              alt="Settings"
              style={{ width: "24px", height: "24px" }}
            />
          </span>
        </div>
        <h2>{radioSelection}</h2>

        {!radioSelectionMode && (
          <div className="radio-selection">
            {Object.keys(dataSetMap).map((setName) => (
              <div
                key={setName}
                className="radio-card"
                onClick={() => {
                  const selectedData = dataSetMap[setName];
                  setJsonData(selectedData);
                  setChecksum(selectedData.checksum);
                  setRadioSelection(setName);
                  setRadioSelectionMode(true);
                  setSelectedSet(null);
                  setFormValues({});
                }}
              >
                {setName}
              </div>
            ))}
          </div>
        )}

        {jsonData && (
          <>
            <h3>Select Message</h3>
            <select defaultValue="" onChange={handleSetChange}>
              <option value="" disabled>
                Please Select
              </option>
              {jsonData &&
                jsonData.uiSets.map((set, index) => (
                  <option key={index} value={set.name}>
                    {set.name}
                  </option>
                ))}
            </select>

            {selectedSet &&
              selectedSet.components.map((item, index) => {
                if (item.type === "hidden") {
                  return null;
                }
                const Component = componentMap[item.type];
                if (item.type === "select") {
                  return (
                    <Component
                      key={index}
                      label={item.label}
                      options={item.options}
                      onChange={(value) => handleChange(item.label, value)}
                    />
                  );
                } else {
                  return (
                    <Component
                      key={index}
                      label={item.label}
                      placeholder={item.placeholder}
                      onChange={(value) => handleChange(item.label, value)}
                    />
                  );
                }
              })}
            {selectedSet && (
              <div>
                <PeriodicMessage
                  selectedSet={selectedSet}
                  formValues={formValues}
                  addPeriodicMessage={addPeriodicMessage}
                  removePeriodicMessage={removePeriodicMessage}
                  periodicMessages={periodicMessages}
                  setPeriodicMessages={setPeriodicMessages}
                />
              </div>
            )}

            <button className="btn-send" onClick={handleFormSubmit}>
              SEND
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppSimulator;
