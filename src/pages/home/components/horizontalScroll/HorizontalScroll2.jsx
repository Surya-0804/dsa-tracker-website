import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const HorizontalScrollReversed = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll =
      contentRef.current.scrollWidth - containerRef.current.clientWidth;

    setScrollPosition(maxScroll - scrollTop);
  };

  useEffect(() => {
    const updateContentWidth = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.scrollWidth / 2);
      }
    };

    updateContentWidth();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const scrollableWidth = contentWidth;
      const maxScroll = contentRef.current.scrollWidth / 2;
      if (scrollPosition <= 0) {
        window.scrollTo(0, maxScroll + scrollPosition);
      }
    }
  }, [scrollPosition, contentWidth]);

  return (
    <div className="horizontal-scroll-container" ref={containerRef}>
      <div
        className="horizontal-scroll-content"
        ref={contentRef}
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        <span className="horizontal-scroll-span-text">Heaps</span>
        <span className="horizontal-scroll-span-text">Bit Manipulation</span>
        <span className="horizontal-scroll-span-text">Backtracking</span>
        <span className="horizontal-scroll-span-text">Dynamic Programming</span>
        <span className="horizontal-scroll-span-text">Heaps</span>
        <span className="horizontal-scroll-span-text">Queues</span>
        <span className="horizontal-scroll-span-text">Searching</span>
        <span className="horizontal-scroll-span-text">Sorting</span>
        <span className="horizontal-scroll-span-text">Greedy</span>
        <span className="horizontal-scroll-span-text">Dynamic Programming</span>
        <span className="horizontal-scroll-span-text">Stacks</span>
        <span className="horizontal-scroll-span-text">Heaps</span>
      </div>
    </div>
  );
};

export default HorizontalScrollReversed;
