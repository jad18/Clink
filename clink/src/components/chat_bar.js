import React from 'react';

import './chat_bar.css';

const ChatBar = ({ room }) => (
  <div className="chatBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
  </div>
);

export default ChatBar;
