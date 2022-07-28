import "./Introduction.css";
import logo from "../../resources/images/logo.png";
import ConnectingButtons from "../../components/button/ConnectingButtons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHost } from "../../slices/BaseSlice";

const Introduction = () => {
  const { identity, isHost } = useSelector((state) => state.baseSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHost(false));
  }, []);

  return (
    <div className="intoduction_page_container">
      <div className="introduction_page_panel">
        <img src={logo} className="introduction_page_image " alt="blank" />
        <ConnectingButtons />
      </div>
    </div>
  );
};

export default Introduction;
