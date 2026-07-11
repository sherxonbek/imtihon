import React from "react";
// import 'boxicons/css/boxicons.min.css';
const months = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

const date = new Date();
const today = `${date.getDate()}-${months[date.getMonth()]}, ${date.getFullYear()}`;

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <span>Bugungi ko'rsatkichlar - {today}</span>
      <div className="flex gap-2 mt-">
        <div className="w-1/3 h-[112.6px] bg-gray-200 rounded-2xl"></div>
        <div className="w-1/3 h-[112.6px] bg-gray-200 rounded-2xl"></div>
        <div className="w-1/3 h-[112.6px] bg-gray-200 rounded-2xl"></div>
        
      </div>
    </div>
  );
}

export default Dashboard;
