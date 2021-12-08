import React from "react";
import ClipLoader from "react-spinners/ClipLoader";


type SpinnerProps = {
  color?: string,
  size?: number,
}

const Spinner = ({ color, size, ...props }: SpinnerProps) => {
  return <ClipLoader color={color || "#fff"} size={size || 24} {...props} />;
};

export default Spinner;
