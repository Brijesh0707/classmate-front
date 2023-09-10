import React from 'react';

const About = () => {
  return (
    <div className='bg-black text-white min-h-screen p-8'>
      <h1 className='text-3xl font-bold pb-10 mb-10 text-center '>About Us</h1>
      <p className='text-lg mb-4'>
        ClassMate Chats is a revolutionary platform designed to bring students together, offering a seamless
        communication experience within various branches of education. Our mission is to provide a
        space for students to connect, share knowledge, and collaborate effectively, ultimately enhancing
        the educational journey.
      </p>
      <p className='text-lg mb-4'>
        Key benefits of using ClassMate Chats include:
      </p>
      <ul className='list-disc list-inside mb-4 pl-4'>
        <li>Facilitating communication and collaboration among students of the same branch.</li>
        <li>Providing a secure and user-friendly environment for sharing information and resources.</li>
        <li>Promoting academic discussions and peer support.</li>
        <li>Enhancing the overall educational experience by fostering a sense of community.</li>
      </ul>
      <p className='text-lg mb-4'>
        Our platform offers a variety of features, including:
      </p>
      <ul className='list-disc list-inside mb-4 pl-4'>
        <li>Branch-specific chatrooms for focused discussions.</li>
        <li>Email verification to ensure a trusted and secure environment.</li>
        <li>Real-time messaging for instant communication.</li>
        <li>Effortless registration and user-friendly interface.</li>
        <li>Responsive design for access on various devices.</li>
      </ul>
      <p className='text-lg'>
        Join us today and become a part of the ClassMate Chats community to explore these benefits and
        discover even more ways our platform can enhance your educational experience.
      </p>
    </div>
  );
};

export default About;
