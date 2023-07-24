import React, { useState } from "react";
import AppSimulator from "./components/AppSimulator";

const Home = () => {
  const [selectedData, setSelectedData] = useState(null);

  const dataSets = [
    { name: "DataSet 1", data: data1 },
    { name: "DataSet 2", data: data2 },
    { name: "DataSet 3", data: data3 },
    { name: "DataSet 4", data: data4 },
  ];

  const handleDataSetSelection = (data) => {
    console.log("Selected data: ", data); // Log the selected data
    setSelectedData(data);
  };

  if (selectedData) {
    console.log("Passing selected data to AppSimulator: ", selectedData); // Log the selected data just before passing it to AppSimulator
    return <AppSimulator data={selectedData} />;
  }

  return (
    <div className="home-container">
      <h1>Select a Dataset</h1>
      <div className="dataset-cards-container">
        {dataSets.map((set, index) => (
          <div
            key={index}
            className="dataset-card"
            onClick={() => handleDataSetSelection(set.data)}
          >
            {set.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
