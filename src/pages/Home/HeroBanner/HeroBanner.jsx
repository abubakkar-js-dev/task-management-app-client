import React from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiClock, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-orange-400 opacity-20"></div>
      <div className="absolute top-40 -left-20 w-40 h-40 rounded-full bg-orange-500 opacity-10"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              #1 Task Management Solution
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Boost Your Productivity with{" "}
              <span className="text-orange-300">Tasky</span>
            </h1>
            <p className="text-blue-50 text-lg mb-8 max-w-lg">
              Organize your tasks, track your progress, and achieve your goals
              faster than ever before with our intuitive task management
              platform.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-8">
              {[
                {
                  icon: <FiCheckCircle />,
                  text: "Simple and intuitive interface",
                },
                { icon: <FiClock />, text: "Track time and set reminders" },
                { icon: <FiTrendingUp />, text: "Analyze productivity trends" },
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-blue-50">
                  <span className="text-orange-300 mr-2 text-xl">
                    {feature.icon}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/my-tasks" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
                Get Started — It's Free
              </Link>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Illustration/Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent rounded-xl opacity-30 transform rotate-3"></div>
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Task Dashboard Preview */}
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800">My Dashboard</h3>
                  <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                    75% Complete
                  </div>
                </div>

                {/* Task list preview */}
                <div className="space-y-3">
                  {[
                    {
                      name: "Complete project proposal",
                      progress: 100,
                      color: "bg-green-100 text-green-600",
                    },
                    {
                      name: "Review quarterly metrics",
                      progress: 60,
                      color: "bg-blue-100 text-blue-600",
                    },
                    {
                      name: "Schedule team meeting",
                      progress: 80,
                      color: "bg-purple-100 text-purple-600",
                    },
                    {
                      name: "Update client documentation",
                      progress: 25,
                      color: "bg-orange-100 text-orange-600",
                    },
                  ].map((task, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-800">
                          {task.name}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${task.color}`}
                        >
                          {task.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            index % 2 === 0 ? "bg-blue-500" : "bg-orange-500"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Charts Preview */}
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">
                  Weekly Progress
                </h3>
                <div className="h-32 flex items-end justify-between">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className={`w-6 ${
                            i % 2 === 0 ? "bg-blue-400" : "bg-orange-400"
                          } rounded-t-sm`}
                          style={{ height: `${20 + Math.random() * 80}px` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">
                          {day}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-400 rounded-full opacity-30"></div>
            <div className="absolute -left-6 top-1/2 w-12 h-12 bg-blue-300 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          fill="#ffffff"
        >
          <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;
