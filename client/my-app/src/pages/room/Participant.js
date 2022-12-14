import React from "react";
import Participants from "./Participants";
import ParticipantsLabel from "./ParticipantsLabel";

function Participant() {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />
      <Participants />
    </div>
  );
}

export default Participant;
