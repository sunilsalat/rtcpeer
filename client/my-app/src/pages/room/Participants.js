import React from "react";

const dummyParticipants = [
  { identity: "Jake" },
  { identity: "anna" },
  { identity: "mark" },
  { identity: "alex" },
];

const SingleParticipant = ({ identity, lastItem, participant }) => {
  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

function Participants() {
  return (
    <div className="participants_container">
      {dummyParticipants.map((e, index) => {
        return (
          <SingleParticipant
            key={e.identity}
            identity={e.identity}
            lastItem={dummyParticipants.length === index + 1}
            participant={e}
          />
        );
      })}
    </div>
  );
}

export default Participants;
