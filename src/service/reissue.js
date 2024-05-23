import axios from 'axios';

const reissueToken = async () => {
  try {
    const response = await axios.post('/reissue', {}, {
      withCredentials: true
    });

    const authorizationHeader = response.headers['authorization'];
    if (authorizationHeader) {
      localStorage.setItem('token', authorizationHeader);
      console.log('Received token after reissuing:', authorizationHeader);
    } else {
      console.error('Authorization header is missing in the reissued token response.');
    }
  } catch (error) {
    console.error('Failed to reissue token:', error);
  }
};

export default reissueToken;
