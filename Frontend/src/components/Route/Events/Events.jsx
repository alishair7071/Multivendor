import React from "react";
import EventCard from "./EventCard.jsx";
import styles from "../../../styles/styles.js";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents?.length !== 0 ? (
              <EventCard data={allEvents && allEvents[0]} />
            ) : (
              <h4> No Events have!</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
