import React from "react";

type DropdownProps = {
  color?: string;
  size?: number;
}

const Dropdown = ({ color, size, ...props } : DropdownProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={size} height={size} fill="white" />
      <path
        d="M11.6243 16.7285L18.7444 9.15369C18.9092 8.97849 19 8.74462 19 8.49525C19 8.24588 18.9092 8.01201 18.7444 7.83682L18.2202 7.27898C17.8786 6.916 17.3234 6.916 16.9823 7.27898L11.0033 13.6397L5.01768 7.27193C4.85286 7.09673 4.63316 7 4.39888 7C4.16435 7 3.94464 7.09673 3.7797 7.27193L3.25561 7.82976C3.0908 8.00509 3 8.23883 3 8.4882C3 8.73757 3.0908 8.97144 3.25561 9.14663L10.3822 16.7285C10.5475 16.9041 10.7683 17.0006 11.0029 17C11.2385 17.0006 11.4591 16.9041 11.6243 16.7285Z"
        fill="#697077"
      />
    </svg>
  );
};

export default Dropdown;