import React, { useState } from "react";
import "./ChatHistory.css";

const ChatHistory = ({ history, onSelectChat,isVisible }) => {

  return (
    <>
      <div className={`ChatHistory ${!isVisible ? "hidden" : ""}`}>
        <ul>
          <li className="history-heading"></li>
          {history.map((item, index) => (
            <li
              key={index}
              className="history-item"
              onClick={() => onSelectChat(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatHistory;