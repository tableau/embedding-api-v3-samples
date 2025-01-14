import { NavLink, Route } from 'react-router';

import BasicEmbedding from './samples/basic-embedding';
import EventListenersInline from './samples/event-listeners-inline';
import Template from './samples/template';

const routes = [
  {
    title: 'Basic embedding',
    path: '/basic-embedding',
    element: <BasicEmbedding />,
  },
  {
    title: 'Inline event listeners',
    path: '/inline-event-listeners',
    element: <EventListenersInline />,
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
