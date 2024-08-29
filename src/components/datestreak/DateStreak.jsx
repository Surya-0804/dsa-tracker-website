import React, { useState, useEffect } from "react";
import "./DateStreak.css";

const DateStreak = () => {
  const [dates, setDates] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const DateStreak = () => {
    const [dates, setDates] = useState([]);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      if (user && token) {
        const userId = user._id;
        const fetchDates = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/stats/userLogins`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            console.log("data:", data);

            // Extract dates from the response data
            if (data.success) {
              const logins = data.data.years[0]?.months[0]?.logins || [];
              const dateObjects = logins.map(login => new Date(login.date));
              setDates(dateObjects);
            }
          } catch (error) {
            console.error("Error fetching dates:", error);
          }
        };

        fetchDates();
      }
    }, [user, token]);

    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay() + 1;
    const thisWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(startOfWeek + i);
      return date;
    });

    const isDateInStreak = (date) => {
      return dates.some(
        (streakDate) => streakDate.toDateString() === date.toDateString()
      );
    };

    const getDayName = (date) => {
      return date.toLocaleDateString("en-US", { weekday: 'short' });
    };

    return (
      <div className="calendar-container">
        {thisWeek.map((date, index) => (
          <div
            key={index}
            className={`calendar-day ${isDateInStreak(date) ? "highlight" : ""}`}
          >
            <div className="day-name">{getDayName(date)}</div>
            <div className="date-number">{date.getDate()}</div>
          </div>
        ))}
      </div>
    );
  };
}


export default DateStreak;