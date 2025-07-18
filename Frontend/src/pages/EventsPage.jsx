import React from "react";
import EventCard from "../components/Route/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <EventCard active={true} data = {allEvents && allEvents[0]}/>
        </div>
      )}
    </>
  );
};

export default EventsPage;
