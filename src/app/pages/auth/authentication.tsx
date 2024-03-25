import React from "react";

import "./Authentication.scss";

interface Props {
  children: React.JSX.Element;
}

const Authentication = (props: Props) => {
  const { children } = props;
  return <div className="auth__container">{children}</div>;
};

export default Authentication;
