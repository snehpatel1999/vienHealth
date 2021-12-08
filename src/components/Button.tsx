import { ReactNode } from "react";
import { Button } from "react-bootstrap";
import Spinner from './Spinner';

type ButtonProps = {
 children: ReactNode;
 isValid: boolean;
 loading?: boolean;
 value?: string;
 className?: string;
 type?: string;
 onClick?: () => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, isValid, loading, value, type, ...props }: ButtonProps) => {
  return (
    <Button
      variant="default"
      className={`text-truncate ${props.className}`}
      {...props}
      {...(!isValid && { disabled: true })}
      {...(loading && { disabled: true })}
    >
      {loading ? <Spinner /> : children || value}
    </Button>
  );
};
