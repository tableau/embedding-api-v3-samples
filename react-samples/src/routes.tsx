import { NavLink, Route } from 'react-router';

import BasicEmbedding from './samples/basic-embedding';

const routes = {
  basicEmbedding: {
    linkText: 'Basic Embedding',
    path: '/basic-embedding',
    element: <BasicEmbedding />,
  },
};

export function getSampleRoutes() {
  return Object.values(routes).map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));
}

export function getSampleLinks() {
  return (
    <ul>
      {Object.values(routes).map(({ linkText, path }) => (
        <li key={path}>
          <NavLink to={path}>{linkText}</NavLink>
        </li>
      ))}
    </ul>
  );
}
