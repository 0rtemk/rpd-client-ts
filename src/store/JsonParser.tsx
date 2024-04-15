import { FC, useEffect } from 'react';
import useStore from './store';
import axios from 'axios';

interface JsonParser {
  profileServerKey: string;
}

const JsonParser: FC<JsonParser> = ({ profileServerKey }) => {
  const { setJsonData } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/rpd-profile-templates?profile_server_key=${profileServerKey}`);
        console.log(response.data);
        setJsonData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [profileServerKey, setJsonData]);

  return null;
};

export default JsonParser;