import React, { useState, useEffect, useRef } from 'react';
import chatboticon from '../assets/chatbot.png';

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hi! How can I assist you today? (e.g., payment, refund, FAQs)' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { from: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('http://localhost:8080/api/dialogflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: '123456', message: chatInput }),
      });

      if (!response.ok) throw new Error('Dialogflow fetch failed');

      const data = await response.json();
      const botReply = { from: 'bot', text: data.reply || 'No reply' };
      setChatMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error('Dialogflow error:', error);
      setChatMessages((prev) => [
        ...prev,
        { from: 'bot', text: "Sorry, I couldn't process that. Please try again later." },
      ]);
    }

    setChatInput('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999 }}>
      {/* Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="btn rounded-circle text-white shadow"
        style={{
          background: 'linear-gradient(to right, #a855f7, #fb923c)',
          padding: '12px',
        }}
        aria-label="Toggle Chatbot"
      >
        <img src={chatboticon} alt="Chatbot Icon" style={{ width: '24px', height: '24px' }} />
      </button>

      {/* Chat Window */}
      {showChatbot && (
        <div
          className="card mt-3 border border-warning"
          style={{ width: '18rem', maxHeight: '400px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
          <div
            className="card-body overflow-auto mb-2"
            style={{ maxHeight: '250px', overflowY: 'auto' }}
          >
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded shadow-sm text-break ${
                  msg.from === 'bot'
                    ? 'bg-warning text-dark align-self-start'
                    : 'bg-primary text-white align-self-end'
                }`}
                style={{ maxWidth: '80%' }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleChatSubmit} className="card-footer d-flex gap-2 p-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="form-control border-warning"
            />
            <button
              type="submit"
              className="btn text-white"
              style={{
                background: 'linear-gradient(to right, #a855f7, #fb923c)',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
