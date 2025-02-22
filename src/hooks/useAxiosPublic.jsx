import axios from 'axios';

const useAxiosPublic = () => {
  
  const instance = axios.create({
    baseURL: 'https://task-management-server-ten-rose.vercel.app',
  });
  
  return instance;
};

export default useAxiosPublic;