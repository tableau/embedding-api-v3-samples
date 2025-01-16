import { TableauPulse } from '@tableau/embedding-api-react';
import { useEffect, useState } from 'react';

export default function PulseThemes() {
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
    <TableauPulse
      token={jwt}
      src="https://10ax.online.tableau.com/pulse/site/{your_site}/metrics/{your_metric_id}"
      themeParameters={[
        {
          name: 'fontCssUrl',
          value: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
        },
        { name: 'backgroundColor', value: '#022' },
        { name: 'foregroundColor', value: '#cff' },
        { name: 'bar', value: '#022', type: 'chart' },
      ]}
    />
  );
}
