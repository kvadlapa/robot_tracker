import React, { useEffect, useState } from "react";

function App() {
  const [robots, setRobots] = useState([]);
  const [robotData, setRobotData] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [playSpeed, setPlaySpeed] = useState(0); // 0 = pause, 1 = play, 2 = fast

  const colors = ["blue", "green", "red", "purple", "orange", "teal"];

  // Auto-play logic with dynamic speed
  useEffect(() => {
    let interval;
    if (playSpeed > 0) {
      const speedStep = playSpeed === 1 ? 0.1 : 0.3;
      const speedDelay = playSpeed === 1 ? 100 : 50;

      interval = setInterval(() => {
        setCurrentTime((prev) =>
          prev + speedStep <= maxTime ? prev + speedStep : minTime
        );
      }, speedDelay);
    }
    return () => clearInterval(interval);
  }, [playSpeed, maxTime, minTime]);

  // Fetch robot info and data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/robots")
      .then((res) => res.json())
      .then((data) => setRobots(data));

    fetch("http://127.0.0.1:8000/robot_data")
      .then((res) => res.json())
      .then((data) => setRobotData(data));

    fetch("http://127.0.0.1:8000/time_range")
      .then((res) => res.json())
      .then((data) => {
        setMinTime(data.min_time);
        setMaxTime(data.max_time);
        setCurrentTime(data.min_time);
      });
  }, []);

  const handleSliderChange = (e) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Robot Position Tracker</h1>

      <svg width="600" height="400" style={{ border: "1px solid black" }}>
        {Object.entries(robotData).map(([robotId, entries]) => {
          const point = entries.findLast((e) => e.time <= currentTime);
          if (!point) return null;

          const robot = robots.find((r) => r.id === parseInt(robotId));

          return (
            <g key={robotId}>
              <circle
                cx={point.x * 20}
                cy={point.y * 20}
                r="8"
                fill={colors[robotId % colors.length]}
              />
              <text
                x={point.x * 20 + 10}
                y={point.y * 20}
                fontSize="12"
                fill="black"
              >
                {robot?.name || `Robot ${robotId}`}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: 10 }}>
          <button
            onClick={() => setPlaySpeed(0)}
            style={{
              padding: "6px 14px",
              backgroundColor: playSpeed === 0 ? "#666" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              flex: 1,
              cursor: "pointer"
            }}
          >
            ⏸ Pause
          </button>

          <button
            onClick={() => setPlaySpeed(1)}
            style={{
              padding: "6px 14px",
              backgroundColor: playSpeed === 1 ? "#007bff" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              flex: 1,
              cursor: "pointer"
            }}
          >
            ▶ Play
          </button>

          <button
            onClick={() => setPlaySpeed(2)}
            style={{
              padding: "6px 14px",
              backgroundColor: playSpeed === 2 ? "#28a745" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              flex: 1,
              cursor: "pointer"
            }}
          >
            ⚡ Fast
          </button>
        </div>

        <input
          type="range"
          min={minTime}
          max={maxTime}
          step="0.01"
          value={currentTime}
          onChange={handleSliderChange}
          style={{ width: "100%" }}
        />
        <p style={{ textAlign: "center" }}>
          Current Time: {currentTime.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default App;
