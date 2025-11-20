import React from "react";

const PageLoader = () => {
  return (
    <div
      className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[min(60px,6vw)] text-[#3c2e9e] animate-reflect"
      role="alert"
      aria-busy="true"
      aria-label="Loading"
    >
      {"LOADING".split("").map((letter, index) => (
        <span
          key={index}
          style={{
            animation: "bouncing-wave-animation 2s infinite",
            animationDelay: `${0.25 * (index + 1)}s`,
            display: "inline-block",
            fontWeight: "bolder",
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default PageLoader;
