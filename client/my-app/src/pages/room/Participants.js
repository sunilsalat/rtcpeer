import React from "react";
import { useSelector } from "react-redux";

const SingleParticipant = ({ identity, lastItem, participant }) => {
  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

function Participants() {
  const { paricipants } = useSelector((state) => state.baseSlice);

  return (
    <div className="participants_container">
      {paricipants.map((e, index) => {
        return (
          <SingleParticipant
            key={e.identity}
            identity={e.identity}
            lastItem={paricipants.length === index + 1}
            participant={e}
          />
        );
      })}
    </div>
  );
}

export default Participants;
