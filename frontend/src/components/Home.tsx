import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to IntelliTeach</h1>
        <p className="text-xl mb-8">Your personalized STEM learning platform</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">For Students</h2>
            <p className="mb-4">Find expert tutors and personalized learning paths</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded">Get Started</button>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">For Tutors</h2>
            <p className="mb-4">Join our platform and connect with students</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded">Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
