import { TableauAuthoringViz } from '@tableau/embedding-api-react';
import { useEffect, useState } from 'react';

export default function AuthoringViz() {
  const [jwt, setJwt] = useState('');

  // Use your preferred method for asynchronously retrieving the JWT from your backend
  // e.g. react-query, RTK Query, SWR, etc.
  // For simplicity, the sample uses a useEffect.
  useEffect(() => {
    getJWT().then((jwt) => setJwt(jwt));
  }, []);

  const getJWT = () => {
    // Call your backend API to get the JWT.
    // Simulate it here with a promise for the sample.
    const apiCallPromise = new Promise<string>((resolve) => {
      setTimeout(() => {
        // https://help.tableau.com/current/api/embedding_api/en-us/docs/embedding_api_auth.html#pass-the-jwt-to-the-tableau-web-component
        const jwt = 'put_your_jwt_here';
        resolve(jwt);
      }, 2000);
    });

    return apiCallPromise;
  };

  return !jwt ? (
    <p>Retrieving JWT...</p>
  ) : (
    <TableauAuthoringViz
      src="https://10ax.online.tableau.com/#/site/{your_site}/views/Superstore/Overview"
      token={jwt}
      // The version check is disabled so these samples can run against Tableau Public even when
      // the version of Tableau is incompatible with this version of the Embedding API.
      // It is recommended to remove the 'disableVersionCheck' prop in your own web applications.
      disableVersionCheck
    />
  );
}
