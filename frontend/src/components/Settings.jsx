import React, { useState } from "react";

const Settings = ({ closeSettings }) => {
  const [srcMac, setSrcMac] = useState("");
  const [dstMac, setDstMac] = useState("");
  const [etherType, setEtherType] = useState("");

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          srcMac: srcMac,
          dstMac: dstMac,
          etherType: etherType,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      console.log(responseData, srcMac, dstMac, etherType);
      closeSettings();
      alert("Update Successful");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="settings-form">
      <h3>Settings</h3>
      <label>Source MAC</label>
      <input
        placeholder="30:9c:23:df:d2:5f"
        type="text"
        value={srcMac}
        onChange={(e) => setSrcMac(e.target.value)}
      />

      <label>Destination MAC</label>
      <input
        placeholder="66:77:88:99:aa:bb"
        type="text"
        value={dstMac}
        onChange={(e) => setDstMac(e.target.value)}
      />

      <label>Ether Type</label>
      <input
        placeholder="0xDD04"
        type="text"
        value={etherType}
        onChange={(e) => setEtherType(e.target.value)}
      />

      <button className="settings-submit" onClick={handleSaveSettings}>
        Save
      </button>
      <button className="close-button" onClick={closeSettings}>
        Close
      </button>
    </div>
  );
};

export default Settings;
