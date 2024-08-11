import React from "react";
import Chart from "react-apexcharts";

let options = {
  grid: {
    show: false,
  },
  chart: {
    id: "basic-bar",
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
};

let series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

const AccountOverviewChart = () => {
  return (
    <div
      className="border-red-700 border-8 flex-1 w-full h-full overflow-x-auto 
    container max-w-6xl px-5 mx-auto mt-10  p-5 "
    >
      <Chart options={options} series={series} type="area" />
    </div>
  );
};

export default AccountOverviewChart;
