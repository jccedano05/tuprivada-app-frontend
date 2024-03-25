import { EyeIcon } from "@/app/utils/icons/EyeIcon";
import HideEyeIcon from "@/app/utils/icons/HideEyeIcon";
import React, { RefObject, forwardRef, useRef, useState } from "react";
import { IconButton } from "./IconButton";

interface Props {
  placeholder?: string;
  type?: string;
  classname?: string;
}

export const InputTextWithIcon = forwardRef(function InputTextWithIcon(
  props: Props,
  ref
) {
  const {
    placeholder = "Write here",
    type = "text",
    classname = "component__InputTextWithIcon",
  } = props;
  const [isTextHide, setIsTextHide] = useState(type === "text" ? false : true);

  const handleHideText = () => {
    setIsTextHide((status) => !status);
  };
  return (
    <div className={`inputText ${classname}`}>
      <input
        type={isTextHide ? "text" : "password"}
        placeholder={placeholder}
        ref={ref as unknown as RefObject<HTMLInputElement>}
      />
      <IconButton
        icon={isTextHide ? <HideEyeIcon /> : <EyeIcon />}
        onClick={handleHideText}
        label="Show/Hide password"
      />
    </div>
  );
});
