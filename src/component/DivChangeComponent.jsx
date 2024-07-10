import React from "react";
import { data } from "./data";

function DivChangeComponent() {
  const [allData, setAllData] = React.useState(data);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [mainData, setMainData] = React.useState([allData[0]]);
  const interval = React.useRef(null);
  const touchStartedInside = React.useRef(false);

  React.useEffect(() => {
    startInterval();
    return () => clearInterval(interval.current);
  }, [currentIndex]); // Only change the interval when currentIndex changes

  React.useEffect(() => {
    setMainData([allData[currentIndex]]); // Update mainData when allData or currentIndex changes
  }, [allData, currentIndex]);

  const startInterval = () => {
    interval.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % allData.length;
      setCurrentIndex(nextIndex);
    }, 3000);
  };

  const pauseInterval = (event) => {
    clearInterval(interval.current);
    if (event.pointerType === "touch") {
      touchStartedInside.current = true;
    }
    console.log(event, "event on start section");
  };

  const resumeInterval = (event) => {
    if (event.pointerType === "touch" && !touchStartedInside.current) {
      return;
    }
    console.log(event, "event on end section");
    startInterval();
  };

  return (
    <div className="parent-container">
      {mainData.map((data, index) => (
        <div
          key={`${data.id}-${index}`}
          className="data-container"
          onPointerEnter={pauseInterval}
          onPointerLeave={resumeInterval}
          onClick={() => setCurrentIndex(index)}
          tabIndex={0}
        >
          <p>{data.id}</p>
          <h1>{data.name}</h1>
          <p>{data.desctiption}</p> {/* Corrected spelling */}
        </div>
      ))}
    </div>
  );
}

export default DivChangeComponent;
