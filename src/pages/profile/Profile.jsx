import React from "react";
import ProblemSolvedChart from "./components/problemSolvedChart/ProblemSolvedChart2";
import TopicSolved from "./components/topicsolved/TopicSolved";
import DonutChart from "./components/donutchart/DonutChart";
import ContributionBoard from "../contibutionboard/ContributionBoard";
import ProblemsSolvedTable from "./components/problemssovedtable/ProblemsSolvedTable";
import UserDetails from "./components/userDetails/UserDetails";
import "./style.css";

export default function Profile() {
  return (
    <div>
      <div className="first-section-profile-page">
        <UserDetails />
      </div>
      <hr className="first-divider-profile" />
      <div className="second-section-profile-page">
        <TopicSolved />
        <ProblemSolvedChart />
      </div>
      <div className="third-section-profile-page">
        <DonutChart Easy={20} Medium={30} Hard={40} />
      </div>
      <hr className="first-divider-profile" />
      <div className="fourth-section-profile-page">
        <ContributionBoard />
      </div>
      <div className="fifth-section-profile-page">
        <ProblemsSolvedTable />
      </div>
    </div>
  );
}
