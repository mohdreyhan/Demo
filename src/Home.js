import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import General from "./Components/ConsumerAccountDetails/General";
import ConsumerHistory from "./Components/ConsumerAccountDetails/ConsumerHistory";
import AccountGeneralInformation from "./Components/ConsumerAccountDetails/GeneralInformation/Accounts/AccountSinglePage/AccountGeneralInformation/AccountGeneralInformation";
import AccountSinglePageHistory from "./Components/ConsumerAccountDetails/GeneralInformation/Accounts/AccountSinglePage/AccountHistory/AccountSinglePageHistory";
import DefaultPage from "./Components/ConsumerAccountDetails/DefaultPage";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import LayoutPage from "./LayoutPage";
import Legal from "./Components/ConsumerAccountDetails/Legal/Legal";

function Home(props) {
  const [rotation, setRotation] = useState("unset");

  const [isLeftPanelExpanded, setIsLeftPanelExpanded] = useState(true);
  const [rotationleft, setRotationleft] = useState("rotate(180deg)");

  const expandRightPanal = () => {
    setIsRightPanelExpanded(!isRightPanelExpanded);
    if (rotation == "rotate(180deg)") {
      setRotation("unset");
    } else {
      setRotation("rotate(180deg)");
    }
  };

  const expandLeftPanal = () => {
    setIsLeftPanelExpanded(!isLeftPanelExpanded);
    if (rotationleft == "unset") {
      setRotationleft("rotate(180deg)");
    } else {
      setRotationleft("unset");
    }
  };

  useEffect(() => {
    if (props.consumerSkipVerification || props.consumerVerification) {
      window.addEventListener("keyup", onKeyBoardButtonPressed);
      return () => {
        window.removeEventListener("keyup", onKeyBoardButtonPressed);
      };
    }
  }, [rotation]);

  const onKeyBoardButtonPressed = (event) => {
    const code = event.code;
    const source = event.target || event.srcElement;
    const sourceTag = source.tagName;
    if (
      code === "BracketRight" &&
      sourceTag !== "TEXTAREA" &&
      sourceTag !== "INPUT"
    ) {
      expandRightPanal();
    }

    if (
      code === "BracketLeft" &&
      sourceTag !== "TEXTAREA" &&
      sourceTag !== "INPUT"
    ) {
      expandLeftPanal();
    }
  };

  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<DefaultPage />} />
        <Route path="/consumer" element={<LayoutPage />}>
          <Route path="/consumer" element={<ProtectedRoute Component = {General} />} />
          <Route path="/consumer/history" element={<ConsumerHistory />} />
          <Route path="/consumer/legal" element={<ProtectedRoute Component = {Legal} />} />
          <Route path="/consumer/accountpage/general" element={<ProtectedRoute Component = {AccountGeneralInformation} />} />
          <Route path="/consumer/accountpage/history" element={<ProtectedRoute Component = {AccountSinglePageHistory} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

function mapStateToProps(state) {
  return {
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification:
      state.ConsumerDetailsReducer.consumerSkipVerification,
  };
}

export default connect(mapStateToProps, null)(Home);
