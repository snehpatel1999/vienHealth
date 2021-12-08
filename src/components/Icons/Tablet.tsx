import React from "react";

type TabletProps = {
  color?: string;
  size?: number;
  className?: string;
}

const Tablet = ({ color, size, ...props }: TabletProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.5661 27.3312L21.047 21.8498L27.3311 15.5657C30.8894 12.0077 30.8894 6.22051 27.3328 2.66564C23.778 -0.888892 17.9892 -0.888892 14.4326 2.66772L8.1489 8.95152L2.66793 14.4326C-0.890696 17.9909 -0.887233 23.7781 2.66585 27.3312C6.22241 30.8879 12.006 30.8913 15.5661 27.3312ZM10.2911 9.66803L15.8618 4.09694C18.6305 1.32819 23.1346 1.32646 25.9033 4.09521C28.672 6.86396 28.672 11.3698 25.9033 14.1386L20.3323 19.7096L10.2911 9.66803Z" fill="#E73D8E"/>
    </svg>
  );
};

export default Tablet;