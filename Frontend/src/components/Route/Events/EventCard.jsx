import React from "react";
import styles from "../../../styles/styles.js";
import CountDown from "./CountDown.jsx";

const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2 mb-12`}>
      <div className="w-full lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic sint cum
          excepturi sapiente magni voluptates recusandae porro iusto,
          perferendis molestiae eius sunt ipsam saepe error doloremque sequi
          corrupti autem minima? Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Praesentium deserunt animi repellendus! Magnam
          reiciendis doloremque incidunt non velit expedita et commodi vel odit.
          Itaque similique quisquam inventore explicabo perspiciatis beatae?
        </p>
        <div className="flex py-2 justify-between">
            <div className="flex">
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    1099$
                </h5>
                <h5 className="font-[bold] text-[20px] text-[#333] font-Roboto">
                    999$
                </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                120 sold
            </span>
        </div>
        <CountDown/>
      </div>
    </div>
  );
};

export default EventCard;
