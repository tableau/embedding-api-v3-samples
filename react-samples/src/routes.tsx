import { NavLink, Route } from 'react-router';

import AuthoringViz from './samples/authoring-viz';
import BasicEmbedding from './samples/basic-embedding';
import BasicFiltering from './samples/basic-filtering';
import BasicPulse from './samples/basic-pulse';
import CustomContextMenu from './samples/custom-context-menu';
import DynamicLoad from './samples/dynamic-load';
import EventListeners from './samples/event-listeners';
import EventListenersInline from './samples/event-listeners-inline';
import GetData from './samples/get-data';
import GetDataTableReader from './samples/get-data-table-reader';
import PulseEvents from './samples/pulse-events';
import PulseMethods from './samples/pulse-methods';
import PulseThemes from './samples/pulse-themes';
import ResizeViz from './samples/resize-viz';
import SelectMarks from './samples/select-marks';
import Template from './samples/template';
import UserEvents from './samples/user-events';
import VizParameters from './samples/viz-parameters';
import VizParametersInline from './samples/viz-parameters-inline';

const routes = [
  {
    title: 'Basic embedding',
    path: '/basic-embedding',
    element: <BasicEmbedding />,
  },
  {
    title: 'Basic filtering',
    path: '/basic-filtering',
    element: <BasicFiltering />,
  },
  {
    title: 'Custom context menu',
    path: '/custom-context-menu',
    element: <CustomContextMenu />,
  },
  {
    title: 'Dynamic loading',
    path: '/dynamic-load',
    element: <DynamicLoad />,
  },
  {
    title: 'Event listeners',
    path: '/event-listeners',
    element: <EventListeners />,
  },
  {
    title: 'Inline event listeners',
    path: '/inline-event-listeners',
    element: <EventListenersInline />,
  },
  {
    title: 'Get data',
    path: '/get-data',
    element: <GetData />,
  },
  {
    title: 'Get logical data',
    path: '/get-data-table-reader',
    element: <GetDataTableReader />,
  },
  {
    title: 'Resize viz',
    path: '/resize-viz',
    element: <ResizeViz />,
  },
  {
    title: 'Select marks',
    path: '/select-marks',
    element: <SelectMarks />,
  },
  {
    title: 'User events',
    path: '/user-events',
    element: <UserEvents />,
  },
  {
    title: 'Viz parameters',
    path: '/viz-parameters',
    element: <VizParameters />,
  },
  {
    title: 'Inline viz parameters',
    path: '/inline-viz-parameters',
    element: <VizParametersInline />,
  },
  {
    title: 'Embedded Web Authoring',
    path: '/authoring-viz',
    element: <AuthoringViz />,
  },
  {
    title: 'Basic Pulse Embedding',
    path: '/basic-pulse',
    element: <BasicPulse />,
  },
  {
    title: 'Pulse events',
    path: '/pulse-events',
    element: <PulseEvents />,
  },
  {
    title: 'Pulse themes',
    path: '/pulse-themes',
    element: <PulseThemes />,
  },
  {
    title: 'Pulse methods',
    path: '/pulse-methods',
    element: <PulseMethods />,
  },
];

export function getSampleRoutes() {
  return routes.map(({ element, path, title }) => (
    <Route key={path} path={path} element={<Template {...{ title, element }} />} />
  ));
}

export function getSampleLinks() {
  return (
    <ul>
      {routes.map(({ title, path }) => (
        <li key={path}>
          <NavLink to={path}>{title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
