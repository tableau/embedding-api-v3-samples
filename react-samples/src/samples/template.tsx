import { NavLink } from 'react-router';

type TemplateProps = {
  title: string;
  element: JSX.Element;
};

export default function Template({ title, element }: TemplateProps) {
  return (
    <>
      <NavLink to={'/'}>Back to sample list</NavLink>
      <h1>{title}</h1>
      <div className="container">{element}</div>
    </>
  );
}
