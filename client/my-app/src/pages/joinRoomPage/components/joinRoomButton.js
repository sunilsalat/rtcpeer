import { useNavigate } from "react-router-dom";

const Button = ({ buttonText, cancleButton, onClickHandler }) => {
  const buttonClass = cancleButton
    ? "join_room_cancle_button"
    : "join_room_success_button";

  return (
    <button onClick={() => onClickHandler()} className={buttonClass}>
      {buttonText}
    </button>
  );
};

const JoinRoomButtons = ({ handleJoinRoom, isHost }) => {
  const navigate = useNavigate();
  const successButtonText = isHost ? "Host" : "Join";

  const pushToIntorductionPage = () => {
    navigate("/");
  };

  return (
    <div className="join_room_buttons_container">
      <Button
        buttonText={successButtonText}
        onClickHandler={handleJoinRoom}
      ></Button>
      <Button
        buttonText="cancle"
        onClickHandler={pushToIntorductionPage}
      ></Button>
    </div>
  );
};

export default JoinRoomButtons;
