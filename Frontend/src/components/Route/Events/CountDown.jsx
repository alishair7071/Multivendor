import React, { useEffect, useState } from "react";
import { server } from "../../../server";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../../../redux/actions/event";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

   /* if (Object.keys(timeLeft).length == 0) {
      console.log("entered in times'up");
      axios
        .delete(`${server}/event/delete-shop-event/${data?._id}`)
        .then((res) => {
          dispatch(getAllEvents());
        }
          );
        
      return;
    }
*/
    return () => clearTimeout(timer);
  }, [timeLeft]);

  function calculateTimeLeft() {
    const difference = +new Date(data?.finish_date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's up</span>
      )}
    </div>
  );
};

export default CountDown;
