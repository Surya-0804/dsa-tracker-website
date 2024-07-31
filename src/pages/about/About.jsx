import React from "react";
import DeveloperDetails from "./components/developerDetails/DeveloperDetails";
import HorizontalScroll from "./components/horizontalScroll/HorizontalScroll1";
import HorizontalScrollReversed from "./components/horizontalScroll/HorizontalScroll2";

export default function About() {
  return (
    <div>
      <HorizontalScroll />
      <HorizontalScrollReversed />
      <DeveloperDetails />
    </div>
  );
}
