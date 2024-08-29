import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrollPosition(scrollTop);
  };

  useEffect(() => {
    const updateContentWidth = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.scrollWidth / 2);
      }
    };

    updateContentWidth();
    window.addEventListener("resize", updateContentWidth);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateContentWidth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const scrollableWidth = contentWidth;
      const maxScroll = contentRef.current.scrollWidth / 2;

      if (scrollPosition >= maxScroll) {
        window.scrollTo(0, scrollPosition - scrollableWidth);
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
        <span className="horizontal-scroll-span-text">Binary Search</span>
        <span className="horizontal-scroll-span-text">Binary Tree</span>
        <span className="horizontal-scroll-span-text">Graph</span>
        <span className="horizontal-scroll-span-text">Stacks</span>
        <span className="horizontal-scroll-span-text">Linked List</span>
        <span className="horizontal-scroll-span-text">Matrix</span>
        <span className="horizontal-scroll-span-text">Arrays</span>
        <span className="horizontal-scroll-span-text">Trie</span>
        <span className="horizontal-scroll-span-text">String</span>
        <span className="horizontal-scroll-span-text">Bit Manipulation</span>
        <span className="horizontal-scroll-span-text">Backtracking</span>
        <span className="horizontal-scroll-span-text">Dynamic Programming</span>
        <span className="horizontal-scroll-span-text">Matrix</span>
      </div>
    </div>
  );
};

export default HorizontalScroll;
