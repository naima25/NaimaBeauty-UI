import React from "react";
import { StatCards } from "./StatCards";
import  {RevenueOverTime}  from "./RevenueOverTime"; // named import
import  {OrdersOverTime}  from "./OrdersOverTime"; // named import
import  {OrdersByCategory}  from "./OrdersByCategory"; // named import
import  {TopSellingProducts}  from "./TopSellingProducts"; // named import



export const Grid = () => {
  return (
    <div className="container px-3 mt-3">
      <div className="row">
        <StatCards />
        <RevenueOverTime />
        <OrdersOverTime />
        <OrdersByCategory />
        <TopSellingProducts />
      </div>
    </div>
  );
};
