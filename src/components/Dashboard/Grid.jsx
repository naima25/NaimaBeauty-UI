// import React from "react";
// import { StatCards } from "./StatCards";
// import  {RevenueOverTime}  from "./RevenueOverTime"; // named import
// import  {OrdersOverTime}  from "./OrdersOverTime"; // named import
// import  {OrdersByCategory}  from "./OrdersByCategory"; // named import
// import  {CustomerAovByCategory}  from "./CustomerAovByCategory"; // named import

// export const Grid = () => {
//   return (
//     <div className="container px-3 mt-3">
//       <div className="row">
//         <StatCards />
//         <RevenueOverTime />
//         <OrdersOverTime />
//         <OrdersByCategory />
//         <CustomerAovByCategory />
//       </div>
//     </div>
//   );
// };

import React from "react";
import { StatCards } from "./StatCards";
import { RevenueOverTime } from "./RevenueOverTime";
import { OrdersOverTime } from "./OrdersOverTime";
import { OrdersByCategory } from "./OrdersByCategory";
import { CustomerAovByCategory } from "./CustomerAovByCategory";

export const Grid = () => {
  return (
    <div className="container px-3 mt-3">
      
      {/* Summary cards at the top */}
      <StatCards />

      {/* Top row: 3 charts side by side */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <RevenueOverTime />
        </div>
        <div className="col-12 col-md-4">
          <OrdersOverTime />
        </div>
        <div className="col-12 col-md-4">
          <OrdersByCategory />
        </div>
      </div>

      {/* Bottom row: 1 chart full width */}
      <div className="row g-3">
        <div className="col-12">
          <CustomerAovByCategory />
        </div>
      </div>
    </div>
  );
};




