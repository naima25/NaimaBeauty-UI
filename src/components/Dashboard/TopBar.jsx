
// import React from "react";
// import { FiCalendar } from "react-icons/fi";

// export const TopBar = () => {
//   const today = new Date();
//   const formattedDate = today.toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "short",
//     day: "numeric",
//   });

//   return (
//     <div className="border-bottom mb-3 mt-2 pb-2 px-3">
//       <div className="d-flex justify-content-between align-items-center">
//         {/* Left side */}
//         <div>
//           <span className="fw-bold d-block">🚀 Good morning, Naima!</span>
//           <span className="text-muted small d-block">{formattedDate}</span>
//         </div>

//         {/* Right side button */}
//         <button className="btn btn-light d-flex align-items-center gap-2">
//           <FiCalendar />
//           <span className="small">Prev 6 Months</span>
//         </button>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { FiCalendar } from "react-icons/fi";

export const TopBar = () => {
  const today = new Date();

  // Format date like "Tuesday, Aug 30"
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // Determine greeting based on current hour
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
        {/* Left side */}
        <div>
          <span className="fw-bold d-block">🚀 {greeting}, Naima!</span>
          <span className="text-muted small d-block">{formattedDate}</span>
        </div>

        {/* Right side button */}
        <button className="btn btn-light d-flex align-items-center gap-2">
          <FiCalendar />
          <span className="small">Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
};


