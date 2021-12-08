import * as React from 'react';
import styled from "styled-components";

import Button from "../Button"


type EmptyStateProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    value: string;
    onClick?: () => void;
}
 
const EmptyState: React.SFC<EmptyStateProps> = ({ title, description, value, icon,  onClick }: EmptyStateProps) => {
    return ( 
        <Wrapper>
            <div className="notes text-center">
                {icon}
                <h4>{title}</h4>
                <p className="notes__description mb-0">{description}</p>
                <Button 
                isValid
                className="btn--default btn-60 font-size-16 font-weight-500 w-75 mx-auto"
                onClick={onClick}>{value}</Button>
            </div>
        </Wrapper>
     );
}


const Wrapper = styled.div`
    height: 60vh;
    display: flex;  
    justify-content: center;
    align-items: center;

    .notes {
        h4 {
            font-weight: 500;
            font-size: 20px;
            line-height: 30px;
        }

        &__description {
            font-size: 18px;
            font-weight: 400;
            color: var(--gray);
            line-height: 26px;
            max-width: 293px;
            padding-bottom: 32px;
        }
    }
`;
 
export default EmptyState;