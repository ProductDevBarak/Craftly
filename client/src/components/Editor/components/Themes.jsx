import React from "react";

// Function to handle click events
const handleClick = (id) => {
  console.log(`Clicked bar ID: ${id}`);
};

// GradientBar Component
const GradientBar = ({ id, gradient, label }) => (
  <div
    style={styles.barContainer}
    onClick={() => handleClick(id)}
  >
    <span style={styles.label}>{label}</span>
    <div
      style={{
        ...styles.bar,
        background: gradient,
      }}
    ></div>
  </div>
);

// Main GradientBars Component
const GradientBars = () => {
  const bars = [
    {
      id: 1,
      gradient: "linear-gradient(to right, #5c677d, #38b2a6, #faefef)",
      label: "Cool Harmony",
    },
    {
      id: 2,
      gradient: "linear-gradient(to right, #255f3d, #9fe3b6, #f5fff0)",
      label: "Forest Canopy",
    },
    {
      id: 3,
      gradient: "linear-gradient(to right, #e4560e, #f6a51d, #fcedd2)",
      label: "Golden Ember",
    },
  ];

  return (
    <div style={styles.container}>
      {bars.map((bar) => (
        <GradientBar
          key={bar.id}
          id={bar.id}
          gradient={bar.gradient}
          label={bar.label}
        />
      ))}
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: "#000",
    padding: "20px",
    minHeight: "100vh",
  },
  barContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    cursor: "pointer",
  },
  label: {
    color: "#fff",
    marginRight: "10px",
    width: "120px",
  },
  bar: {
    width: "300px",
    height: "20px",
    borderRadius: "10px",
  },
};

export default GradientBars;
