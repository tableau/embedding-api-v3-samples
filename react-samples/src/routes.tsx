import { NavLink, Route } from 'react-router';

import BasicEmbedding from './samples/basic-embedding';
import BasicFiltering from './samples/basic-filtering';
import CustomContextMenu from './samples/custom-context-menu';
import DynamicLoad from './samples/dynamic-load';
import EventListeners from './samples/event-listeners';
import EventListenersInline from './samples/event-listeners-inline';
import GetData from './samples/get-data';
import GetDataTableReader from './samples/get-data-table-reader';
import ResizeViz from './samples/resize-viz';
import Template from './samples/template';

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
