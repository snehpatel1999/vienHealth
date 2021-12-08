import React, { ReactNode, FunctionComponent, Fragment } from "react";
import styled from "styled-components";
import Skeleton from 'react-loading-skeleton';


type CardProps = {
  activity: {
    content?: string;
    icon: ReactNode;
    title: string;
    stat?: number;
  }
}

const ActivitiesCard: FunctionComponent<CardProps> = ({ activity, ...props}) => {
  
  return (
    <Fragment>
      {!activity &&(
        <Skeleton width={450} height={140} style={{ borderRadius: 16}}/>
      )}


        {activity && (

        <Wrapper {...props}>
          {activity.icon}

          <div className="gray-text">
            <p className="font-weight-300 mb-1" style={{ fontSize: 22 }}>
              {activity.title}
            </p>

            <div className="d-flex justify-content-between align-items-center mb-1">
              <p className="navy-blue-text font-weight-600 mb-0 stats">{activity.stat}</p>
              <p className="font-weight-600 mb-0 pink-text percentage">
              {/* -2.5% */}
              </p>
            </div>

            {/* <p className="meta mb-0">Compared to ({activity.stat} last week)</p> */}
          </div>

        </Wrapper>
        )}
    </Fragment>
  );
};

const Wrapper = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr);
  align-items: center;
  background-color: var(--white);
  border-radius: 22px;
  grid-gap: 14px;

  .stats {
    font-size: 28px;
    line-height: 36px;
  }

  .percentage {
    font-size: 20px;
    line-height: 30px;
  }

  .meta {
    font-weight: 300;
    font-size: 18px;
    line-height: 23px;
  }
`;

export default ActivitiesCard;
