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
  }, []);

  React.useEffect(() => {
    setMainData([allData[currentIndex]]);
  }, [allData, currentIndex]);

  const startInterval = React.useCallback(() => {
    interval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allData.length);
    }, 3000);
  }, [allData.length]);

  const pauseInterval = (event) => {
    const container = event.currentTarget;
    if (event.pointerType === "touch") {
      touchStartedInside.current = true;
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.classList.add("active");
      clearInterval(interval.current);
    } else {
      touchStartedInside.current = false;
      container.classList.add("active");
      clearInterval(interval.current);
    }
  };

  const handleTouchStart = (event) => {
    const container = event.currentTarget;
    if (!touchStartedInside.current) return;
    container.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
    console.log(event, "add Touch event");
  };

  const handleTouchEnd = (event) => {
    const container = event.currentTarget;
    if (!touchStartedInside.current) return;
    container.removeEventListener("touchend", handleTouchEnd);
    touchStartedInside.current = false;
    container.classList.remove("active");
    console.log(event, "remove Touch event");
    startInterval();
  };

  const resumeInterval = (event) => {
    const container = event.currentTarget;
    console.log(event, "event");
    if (event.pointerType !== "touch" && !touchStartedInside.current) {
      container.classList.remove("active");
      console.log(event, "remove event");
      startInterval();
    }
  };

  return (
    <div className="parent-container">
      {mainData.map((data, index) => (
        <div
          key={`${data.id}-${index}`}
          className="data-container"
          onPointerEnter={pauseInterval}
          onPointerLeave={resumeInterval}
          tabIndex={0}
        >
          <p>{data.id}</p>
          <h1>{data.name}</h1>
          <p>{data.desctiption}</p>
        </div>
      ))}
    </div>
  );
}

export default DivChangeComponent;
