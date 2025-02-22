import React from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft, FiHome } from "react-icons/fi";
import { FaRegSadTear } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
                  <Helmet>
                      <title>404 Not Found | Tasky</title>
                  </Helmet>
      {/* Visual Error Indicator */}
      <div className="relative mb-8">
        <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="relative bg-white p-6 rounded-full shadow-lg">
          <FaRegSadTear className="text-blue-500 text-8xl" />
        </div>
      </div>

      {/* Error Title & Description */}
      <div className="text-center mb-10 max-w-md">
        <div className="flex items-center justify-center mb-4">
          <FiAlertTriangle className="text-yellow-500 text-2xl mr-2" />
          <h1 className="text-4xl font-bold text-gray-800">
            Oops!
          </h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600">
          We couldn't find the page you're looking for. It might have been moved, 
          deleted, or never existed in the first place.
        </p>
      </div>

      {/* Error Code */}
      <div className="mb-10">
        <span className="bg-blue-50 text-blue-500 text-6xl font-bold py-2 px-4 rounded-lg">
          404
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={goBack}
          className="flex items-center justify-center gap-2 bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 transition-colors py-3 px-6 rounded-lg font-medium"
        >
          <FiArrowLeft />
          <span>Go Back</span>
        </button>
        <button
          onClick={goHome}
          className="flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors py-3 px-6 rounded-lg font-medium"
        >
          <FiHome />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Animated Dots */}
      <div className="flex space-x-2 mt-16">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-blue-300"
            style={{
              animation: `bounce 1.4s infinite ease-in-out both`,
              animationDelay: `${index * 0.16}s`
            }}
          />
        ))}
      </div>

      {/* CSS for the animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: 0.5;
          } 
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;