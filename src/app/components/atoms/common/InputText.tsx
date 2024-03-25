import React, { RefObject, forwardRef } from "react";
import "./InputText.scss";

interface Props {
  placeholder?: string;
  type?: string;
  classname?: string;
}

const InputText = forwardRef(function InputText(props: Props, ref) {
  const {
    placeholder = "Write here",
    type = "text",
    classname = "component__InputText",
  } = props;

  return (
    <>
      <input
        type={type}
        className={`inputText ${classname}`}
        placeholder={placeholder}
        ref={ref as unknown as RefObject<HTMLInputElement>}
      />
    </>
  );
});

export default InputText;
