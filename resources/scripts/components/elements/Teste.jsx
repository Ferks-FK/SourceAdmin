import axios from 'axios';
import { useState, useEffect } from 'react';

function FlashMessages() {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    axios.get('/flash-messages')
      .then(response => {
        console.log(response.data)
        setMessages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {messages.success && <div className="alert alert-success">{messages.success}</div>}
      {messages.warning && <div className="alert alert-warning">{messages.warning}</div>}
      {messages.error && <div className="alert alert-danger">{messages.error}</div>}
      {messages.info && <div className="alert alert-info">{messages.info}</div>}
    </div>
  );
}

export { FlashMessages };
