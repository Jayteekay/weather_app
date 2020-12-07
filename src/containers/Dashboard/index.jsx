import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "../../redux";
import Header from "../../components/Header";
import styles from "./dashboard.module.scss";
import Body from "../Body";
import { BrowserRouter as Router } from "react-router-dom";
import { Offline } from "react-detect-offline";
import Prompt from "../../elements/Prompt";
import { PROMPT_TYPE_NEGATIVE } from "../../utils/constants";

const Dashboard = () => {
  const [showOfflinePrompt, setShowOfflinePrompt] = useState(true);
  const removeOfflinePrompt = () => {
    setShowOfflinePrompt(false);
  };
  return (
    <Provider store={store}>
      <Router>
        <div data-testid="dashboard" className={styles._}>
          <Header />
          <Body />
          <Offline>
            {showOfflinePrompt && (
              <Prompt
                type={PROMPT_TYPE_NEGATIVE}
                message="You are currently offline"
                onClose={removeOfflinePrompt}
              />
            )}
          </Offline>
        </div>
      </Router>
    </Provider>
  );
};

export default Dashboard;
