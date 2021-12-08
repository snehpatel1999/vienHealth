import { FC } from "react";
import Calendar from 'react-calendar'
import styled from "styled-components";
import dayjs from 'dayjs'
import { isEmpty } from "lodash"
import Skeleton from 'react-loading-skeleton';
import updateLocale from 'dayjs/plugin/updateLocale'
import useSWR from 'swr'

import { useAuth } from "../context/authProvider";

import ActivitiesCard from "../components/Dashboard/ActivitiesCard";
import * as Icon from "../components/Icons";
import Button from "../components/Button";
import HeadMeta from "../components/Layout/HeadMeta";
import Layout from "../components/Layout/Layout";
import Greeting from "../components/Dashboard/Greeting";


dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
});


interface DashboardProps {
  active?: boolean,
}


const Dashboard:FC<DashboardProps>  = () => {
  /**
   * state
   */
  const { user } = useAuth();

  const today = dayjs(new Date()).format("YYYY-MM-DD");

  const { data , error } = useSWR('api/doctor/appointments/get?type=doctor');
  const appointments: any = "";
  const { data: currentAppointment } = useSWR(`api/doctor/appointments/filter/${today}?type=doctor`);

  console.log(currentAppointment?.stats);  
  const past = (() => {
    if (appointments) {
      if (appointments?.appointments?.length > 0 ) {
        return appointments?.appointments?.filter((a: any) => a?.status === "completed");
      } else {
        return [];
      }
    }

    return [];
  })();

  
/**
 * variables
 */
  const activities = [
      {
        title: "Patients",
        icon: <Icon.Person />,
        stat: currentAppointment?.stats?.allPatients || 0,
      },
      {
        title: "Appointments",
        icon: <Icon.Calendar />,
        stat:  currentAppointment?.stats?.appointmentsWaiting || 0,
      },
  ];

  // console.log(currentAppointment);

  return (
    <div>
      <HeadMeta title="Dashboard - Holistic Health | Vien Health"
         description="Dashboard - Holistic Health| Vien Health">
      <Layout>
        <Content>
          <Main>
            <Greeting /> 

            <p className="top__card__heading font-weight-600">
             Today's Activities
            </p>

            <div className="activities__card">
              {activities.map((activity, index) => (
               <ActivitiesCard key={index} {...{ activity }} />
              ))}
            </div>

            <p className="appointments__heading font-weight-600 mb-0">
             Upcoming Appointments

             {currentAppointment?.appointments.length > 3 && (
              <a
                href="/dashboard"
                className="pink-text text-decoration-none font-size-16 font-weight-500"
              >
                View all
              </a>
             )}
            </p>

          <div className="appointments mb-3">

             {!currentAppointment && <p>There are no upcoming appointments</p>}

             {currentAppointment?.appointments.length === 0 &&(
               <Skeleton width={450} height={140} style={{ borderRadius: 16}}/>
             )}

             {currentAppointment?.appointments.length > 0 && currentAppointment?.appointments?.map((appointment: any, key: number) => (
               <a href={`/notes/${appointment?._id}`} className="appointments__card text-decoration-none" key={key}>
                 <img
                   src={appointment?.patient_details?.basicInfo?.image || process.env.REACT_APP_PLACEHOLDER_PROFILE_PICTURE}
                   alt="avatar"
                   className="avatar"
                 />
                 <div>
                   <p className="dark-navy-text font-weight-600 mb-2">
                    {appointment?.patient_details?.basicInfo?.firstName} {appointment?.patient_details?.basicInfo?.lastName}
                   </p>
                   <p className="gray-text">
                     {dayjs(appointment?.date).format("MMM DD, YYYY")} at {appointment?.time}
                   </p>
                   <div className="d-flex">
                     {/* <Button
                       isValid
                       className="btn--default btn-40 font-weight-400 font-size-14"
                     >
                       Reschedule
                     </Button> */}
                     <a href={`/patient/${appointment?.patient_details?.basicInfo?._id}/details/${appointment?._id}`}
                       onClick={(e) => e.stopPropagation()}
                       className="btn-outline"
                     >
                       View Details
                     </a>
                   </div>
                 </div>
               </a>

             ))}
           </div>

            <div>
              <p className="appointments__heading font-weight-600 mb-0">
                Recently completed sessions
                {/* <a
                  href="/dashboard"
                  className="pink-text text-decoration-none font-size-16 font-weight-500"
                >
                  View all
                </a> */}
              </p>
            </div>

            <div className="appointments mb-3">
              {!past?.length && <p>Past sessions will show up here.</p>} 

             
             {past.length > 0 && past?.map((appointment: any, key: number) => (
               <a href={`/patient/${appointment?.patient_id?.basicInfo?._id}/details/${appointment?._id}`} className="appointments__card text-decoration-none" key={key}>
                 <img
                   src={appointment?.patient_id?.basicInfo?.image || process.env.REACT_APP_PLACEHOLDER_PROFILE_PICTURE}
                   alt="avatar"
                   className="avatar"
                 />
                 <div>
                   <p className="dark-navy-text font-weight-600 mb-2">
                     {appointment?.patient_id?.basicInfo?.firstName} {appointment?.patient_id?.basicInfo?.lastName}
                   </p>
                   <p className="gray-text">{dayjs(appointment?.completed_at).format("MMM DD, YYYY [at] h:mm A")}</p>
                   <div className="d-flex">
                     <Button
                       isValid
                       className="btn--default btn-40 font-weight-400 font-size-14"
                       onClick={() => (window.location.href = `/patient/${appointment?.patient_id?.basicInfo?._id}/details/${appointment?._id}`)}
                     >
                       View Details
                     </Button>
                   </div>
                 </div>
               </a>
             ))}
             </div>
          </Main>

          <Aside>
            <StyledCalendar prev2Label={null} next2Label={null} formatShortWeekday={(locale, date) => dayjs(date).format('dd')} />

            {!isEmpty(currentAppointment?.appointments_today_Notification) && (
             <div className="side__card">
               <img
                 src={currentAppointment?.appointments_today_Notification?.patient_id?.basicInfo?.image || process.env.REACT_APP_PLACEHOLDER_PROFILE_PICTURE}
                 alt="avatar"
                 className="avatar"
               />
               <div className="pl-2">
                 <p className="placeholder-text font-weight-400 mb-2">
                   Your video appointment with {" "}
                   {currentAppointment?.appointments_today_Notification?.patient_id?.basicInfo?.firstName} 
                   {currentAppointment?.appointments_today_Notification?.patient_id?.basicInfo?.lastName} is in{" "}
                   <span className="white-text">
                     10 minutes.</span>
                 </p>

                 <Button
                   isValid
                   className="btn-40 ml-1 font-weight-400 font-size-14 w-100 white-text"
                 >
                   Join
                 </Button>
               </div>
             </div>
           )}
          </Aside>
        </Content>
      </Layout>
      </HeadMeta>
    </div>
  );
};

const Main = styled.div`
  
`;

const Content = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr 428px;
  justify-content: space-between;
  // box-shadow: var(--shadow);
  // border-radius: 6px;
  // padding-top: 32px;
  // .top__card {
  //   background-color: var(--light-blue);
  //   padding: 40px;
  //   border-radius: 24px;
  //   h1 {
  //     font-size: 34px;
  //   }
  //   &__heading {
  //     padding-top: 40px;
  //     padding-bottom: 24px;
  //     color: var(--dark-navy);
  //     font-size: 22px;
  //     line-height: 30px;
  //   }
  // }
  // .activities__card {
  //   gap: 32px;
  //   display: grid;
  //   margin-bottom: 16px;
  //   grid-template-columns: repeat(2, 1fr);
  // }


  // .appointments {
  //   display: grid;
  //   gap: 32px;
  //   grid-template-columns: repeat(2, 1fr);

  //   &__heading {
  //     padding-top: 24px;
  //     padding-bottom: 24px;
  //     display: flex;
  //     justify-content: space-between;
  //     font-size: 22px;
  //     line-height: 30px;
  //     color: var(--dark-navy);
  //   }
  //   &__card {
  //     gap: 8px;
  //     padding: 16px;
  //     display: grid;
  //     background-color: var(--white);
  //     border: solid 1px var(--stroke);
  //     border-radius: 18px;
  //     grid-template-columns: 70px minmax(0, 1fr);
  //     .avatar {
  //       border-radius: 16px;
  //       width: 70px;
  //       height: 70px;
  //       object-fit: cover;
  //       object-position: center;
  //       background-color: var(--gray);
  //     }
  //     .btn-40 {
  //       border-radius: 10px !important;
  //       padding: 10px;
  //       margin:0 4px;
  //     }

  //     .btn-outline {
  //       text-decoration: none;
  //       margin:0 4px;
  //       color: var(--default);
  //       border: solid 1px var(--default);
  //       align-items: center;
  //       border-radius: 10px;
  //       font-weight: 500;
  //       padding: 10px;
  //       font-size: 14px;
  //       line-height: 18px;
  //       display: flex;
  //     }
  //   }
  // }
`;

const Aside = styled.div`
  
  .side__card {
    background-color: var(--navy-blue);
    border: solid 1px var(--stroke);
    border-radius: 18px;
    padding-top: 24px;
    padding-bottom: 18px;
    padding-right: 43px;
    padding-left: 24px;
    margin-top: 40px;
    color: var(--placeholder);
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr);
    gap: 14px; 
    
    .avatar {
      border-radius: 16px;
      width: 50px;
      height: 50px;
      object-fit: cover;
      object-position: center;
      background-color: var(--gray);
    }
    .btn-40 {
      border: solid 1px var(--white);
    }
  }
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  width: 100%;
  font-family: Euclid Circular A;
  background: none;

  .react-calendar__tile--now{
    color: #fff !important;
    background: var(--pink);
    border-radius: 10px;
    text-decoration: underline dotted #fff;
  }

  .react-calendar__month-view__days__day {
    color: var(--navy-blue);
    font-weight: 400;
  }

  .react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus{
    background: var(--navy-blue);
    color: #fff;
  }

  .react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus {
    color: #fff;
    background: var(--pink);
    border-radius: 10px;
    text-decoration: underline dotted #fff;
  }

  .react-calendar__month-view__weekdays {
    font-weight: 300;
    font-size: 20px;
    line-height: 25px;
    color: var(--gray);
    margin-bottom: 4px;
    text-transform: capitalize;
    border-bottom: solid 2px #F1F1F1;
  }

  abbr[title], abbr[data-bs-original-title] {
    text-decoration: none
  }

  .react-calendar__tile--active{
    color: #fff;
    background: var(--pink);
    border-radius: 10px;
    text-decoration: underline dotted #fff;
  }

  .react-calendar__month-view__days__day--neighboringMonth{
    color: var(--placeholder);
  }

  .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus {
    border-radius: 10px;
  }

  .react-calendar__navigation__label__labelText{
    font-weight: 600;
    color: var(--navy-blue);
    font-size: 26px;
    line-height: 34px;
  }
`;

export default Dashboard;