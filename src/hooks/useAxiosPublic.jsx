import React from 'react';
import axios from 'axios';

const useAxiosPublic = () => {
  
  const instance = axios.create({
    baseURL: 'http://localhost:5000',
  });
  
  return instance;
};

export default useAxiosPublic;