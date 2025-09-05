import {
  Api,
  TableauPulse,
  useTableauPulseErrorCallback,
  useTableauPulseFiltersChangedCallback,
  useTableauPulseFirstInteractiveCallback,
  useTableauPulseFirstMetricSizeKnownCallback,
  useTableauPulseInsightDiscoveredCallback,
  useTableauPulseMetricSizeChangedCallback,
  useTableauPulseTimeDimensionChangedCallback,
  useTableauPulseUrlChangedCallback,
} from '@tableau/embedding-api-react';
import { useEffect, useState } from 'react';

export default function PulseEvents() {
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

  const onPulseFirstInteractive = useTableauPulseFirstInteractiveCallback(async () => {
    console.log('onPulseFirstInteractive');
  }, []);

  const onFirstPulseMetricSizeKnown = useTableauPulseFirstMetricSizeKnownCallback((event) => {
    const { detail, target: pulse } = event;

    console.log('onFirstPulseMetricSizeKnown');
    console.log('width', detail.width);
    console.log('height', detail.height);

    pulse.iframe.style.width = `${detail.width}px`;
    pulse.iframe.style.height = `${detail.height}px`;
  }, []);

  const onPulseMetricSizeChanged = useTableauPulseMetricSizeChangedCallback((event) => {
    const { detail, target: pulse } = event;

    console.log('onPulseMetricSizeChanged');
    console.log('width', detail.width);
    console.log('height', detail.height);

    pulse.iframe.style.width = `${detail.width}px`;
    pulse.iframe.style.height = `${detail.height}px`;
  }, []);

  const onPulseError = useTableauPulseErrorCallback((event) => {
    const { detail } = event;

    console.log('onPulseError');
    console.log('message', detail.message);
  }, []);

  const onPulseFiltersChanged = useTableauPulseFiltersChangedCallback(async (event) => {
    const { detail, target: pulse } = event;

    console.log('onPulseFiltersChanged');
    console.log('fieldNames', detail.fieldNames);

    // Wait for the new Pulse metric to load before retrieving its new filter information.
    await new Promise((resolve) => {
      pulse.addEventListener(Api.TableauEventType.FirstInteractive, resolve, { once: true });
    });

    const filters = await detail.getFiltersAsync();
    console.log(filters);
  }, []);

  const onPulseInsightDiscovered = useTableauPulseInsightDiscoveredCallback((event) => {
    const { detail } = event;

    console.log('onPulseInsightDiscovered');
    console.log('question', detail.question);
  }, []);

  const onPulseTimeDimensionChanged = useTableauPulseTimeDimensionChangedCallback((event) => {
    const { detail } = event;

    console.log('onPulseTimeDimensionChanged');
    console.log('timeDimension', detail.timeDimension);
  }, []);

  const onPulseUrlChanged = useTableauPulseUrlChangedCallback((event) => {
    const { detail } = event;

    if (detail.context === 'session-expired') {
      console.log('onPulseUrlChanged');
      console.log('Pulse session expired, regenerate JWT and reload metric');
    }
  }, []);

  return !jwt ? (
    <p>Retrieving JWT...</p>
  ) : (
    <TableauPulse
      token={jwt}
      src="https://10ax.online.tableau.com/pulse/site/{your_site}/metrics/{your_metric_id}"
      onFirstInteractive={onPulseFirstInteractive}
      onFirstPulseMetricSizeKnown={onFirstPulseMetricSizeKnown}
      onPulseMetricSizeChanged={onPulseMetricSizeChanged}
      onPulseError={onPulseError}
      onPulseFiltersChanged={onPulseFiltersChanged}
      onPulseInsightDiscovered={onPulseInsightDiscovered}
      onPulseTimeDimensionChanged={onPulseTimeDimensionChanged}
      onPulseUrlChanged={onPulseUrlChanged}
    />
  );
}
