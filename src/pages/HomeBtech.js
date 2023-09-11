import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactScrollableFeed from 'react-scrollable-feed';

const HomeBtech = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('User')) || { name: 'Default User' };
  const branch = localStorage.getItem('branch');
  useEffect(() => {
    if (!user.token || branch !== 'btech') {
      navigate('/');
    }
  }, [navigate, branch, user.token]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    try {
      const response = await fetch('https://classmate-server.onrender.com/messagebtech/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: user.name, message: messageInput }),
      });

      if (response.status === 201) {
        setMessageInput('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://classmate-server.onrender.com/messagebtechget/user');
      const data = await response.json();

      if (Array.isArray(data)) {
        setMessages(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const pollingInterval = setInterval(fetchMessages, 1000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <div className='bg-black w-full h-screen flex flex-col justify-center items-center'>
      <h1 className='text-white text-center py-4 text-2xl'>ClassMate Chats - BTECH</h1>
      <ReactScrollableFeed className='bg-slate-900 flex flex-col border border-green-700 overflow-x-auto w-[98%] h-[70vh] items-center relative' style={{ scrollBehavior: 'smooth' }}>
        {isLoading && (
          <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500'></div>
          </div>
        )}
        {!isLoading &&
          messages.map((message, index) => (
            <div
              key={index}
              className='bg-black p-4 rounded-lg mt-2 mb-2 text-center border max-w-[200px] h-[auto] border-sky-900 relative'
            >
              <h6 className='whitespace-wrap break-words text-red-500'>
                <b>{message.name}:</b>
              </h6>
              <p className='whitespace-wrap break-words text-white'>{message.message}</p>
            </div>
          ))}
      </ReactScrollableFeed>
      <div className='flex p-4 w-[340px] mb-3 justify-center text-center'>
        <input
          type='text'
          className='flex-1 p-2 rounded-l-lg focus:outline-none'
          placeholder='Type your message...'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className='bg-blue-800 text-white rounded-r-lg px-4 py-2 ml-2'
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default HomeBtech;
