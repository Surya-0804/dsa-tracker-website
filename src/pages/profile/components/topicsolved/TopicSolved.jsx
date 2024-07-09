import React, { useEffect, useState } from 'react';
import './TopicSolved.css';

const TopicSolved = () => {
  const [problemsData, setProblemsData] = useState({ languages: [], topics: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/stats/topicWiseStats`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        console.log(data);
        const topicWiseCount = data.stats.topicWiseCount;

        // Transform the API data into the desired format
        const topics = Object.keys(topicWiseCount).map(key => ({ name: key, count: topicWiseCount[key] }));

        setProblemsData(prevState => ({ ...prevState, topics }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="TopicSolvedcontainer">
      <div className="TopicSolvedsection">
        <h3>Languages used</h3>
        {problemsData.languages.map((language, index) => (
          <div key={index} className="TopicSolvedlanguageItem">
            <span className='languageName'>{language.name}</span>
            <span className='NoProblems'>{language.problemsSolved} Problems Solved</span>
          </div>
        ))}
        <div className="TopicShowMore">Show more</div>
        <hr className='TopicsHr' />
      </div>
      <div className="TopicSolvedsection">
        <h3>Topics Covered</h3>
        {problemsData.topics.map((topic, index) => (
          <div key={index} className="TopicSolvedtopicItem">
            <span className='TopicSolvedName'>{topic.name}</span>
            <span style={{ opacity: 0.6 }} className='TopicSolvedCount'>x {topic.count}</span>
          </div>
        ))}
        <div className="TopicShowMore">Show more</div>
      </div>
    </div>
  );
};

export default TopicSolved;