import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid"; // adjust path if needed


export const Dashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        padding: "2rem",
        paddingBottom: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        marginTop: "2rem",
      }}
    >
      <TopBar />
      <Grid />

    </div>
  );
};
