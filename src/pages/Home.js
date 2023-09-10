import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactScrollableFeed from 'react-scrollable-feed';

const Home = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const branch = localStorage.getItem('branch');

  const user = JSON.parse(localStorage.getItem('User')) || { name: 'Default User' };
  useEffect(()=>{
    if(!user.token || !branch==="bca"){
      navigate("/");
    }
  },[navigate,branch])

  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    try {
      const response = await fetch('https://classmate-server.onrender.com/messagebca/user', {
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
      const response = await fetch('https://classmate-server.onrender.com/messagebcaget/user');
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
      <h1 className='text-white text-center py-4 text-2xl'>ClassMate Chats - BCA</h1>
      <ReactScrollableFeed className='bg-slate-900 flex flex-col  border border-green-700 overflow-x-auto w-[98%] h-[70%]  items-center' style={{ scrollBehavior: 'smooth' }} >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className='bg-black p-4 rounded-lg mb-2 text-center mt-2 border max-w-[200px] border-sky-900'
            >
              <h6 className='whitespace-wrap break-words text-red-500'>
                <b>{message.name}:</b>
              </h6>
              <p className='whitespace-wrap break-words text-white'>{message.message}</p>
            </div>
          ))
        )}
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

export default Home;
