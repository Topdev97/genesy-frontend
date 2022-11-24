import { NavLink, useSearchParams } from "react-router-dom";

const LinkWithSearchParams = (props: any) => {
  const [searchParams] = useSearchParams();
  return (
    <NavLink
      {...props}
      to={{
        pathname: props.to.pathname,
      }}
    >
      {props.children}
    </NavLink>
  );
};

export default LinkWithSearchParams;
