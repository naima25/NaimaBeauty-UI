import React from "react";

export const TopBar = () => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const hour = today.getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else if (hour >= 18 || hour < 5) {
    greeting = "Good evening";
  }

  return (
    <div className="border-bottom mb-3 mt-2 pb-2 px-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-bold d-block">🚀 {greeting}, Naima!</span>
          <span className="text-muted small d-block">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};



