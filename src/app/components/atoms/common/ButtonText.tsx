import React from "react";
import "./ButtonText.scss";

interface Props {
  text?: string;
  classname?: string;
  type?: string;
  onClick: ((e: React.FormEvent) => void) | (() => void);
}

export const ButtonText = (props: Props) => {
  const { text, classname = "component__ButtonText", onClick } = props;

  const handleClick = (e: React.FormEvent) => {
    onClick(e);
  };

  return (
    <div onClick={handleClick} className={`btn__container ${classname}`}>
      {text?.toUpperCase()}
    </div>
  );
};
