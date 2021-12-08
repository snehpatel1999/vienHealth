/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Fragment, useState } from 'react';
import styled from "styled-components";
import { Tabs, Tab, Button } from "react-bootstrap";
import { useParams } from 'react-router';
import { createLocalTracks, connect} from "twilio-video"
import useSWR from 'swr'

import ClinicalNotes from '../components/Dashboard/ClinicalNotes';
import Prescriptions from '../components/Dashboard/Prescriptions';
import Treatment from '../components/Dashboard/Treatment';
import HeadMeta from '../components/Layout/HeadMeta';
import { generateToken } from '../services/appointmentService';

export interface NotesProps {
    
}
 
const Notes: React.FC<NotesProps> = () => {
  /**
   * variables
   */
  const parsed: any = useParams()  
  
  const [section, setSection] = useState("section") 

  /**
  * api
  */
    const { data: appointmentDetails } = useSWR(`/api/doctor/appointment/${parsed?.id}`)


   const tabs = [
     {
        name: "Clinical Notes",
        slug: "clinical",
        component: <ClinicalNotes {...{notes: appointmentDetails?.notes}} />,
     },
     {
        name: "Prescriptions",
        slug: "prescriptions",
        component: <Prescriptions {...{ prescription : appointmentDetails?.prescription}} />,
     },
     {
        name: "Treatment",
        slug: "treatment",
        component: <Treatment {...{ treatments : appointmentDetails?.treatments}} />,
     }
   ]  
   
   const fullname = `${appointmentDetails?.patient_id?.basicInfo?.firstName} ${appointmentDetails?.patient_id?.basicInfo?.lastName}`

  let room: any;

  // get participant video
  const onParticipantDisconnected = (participant: any) => {
  const participantDiv: any = document.getElementById(participant.sid);
  participantDiv.parentNode.removeChild(participantDiv);
  };

  const onParticipantConnected = (participant: any) => {
    const participantDiv = document.createElement("div");
    participantDiv.id = participant.sid;

    // when a remote participant joins, add their audio and video to the DOM
    const trackSubscribed = (track: { attach: () => any; }) => {
      participantDiv.appendChild(track.attach());
    };
    participant.on("trackSubscribed", trackSubscribed);

    participant.tracks.forEach((publication: { isSubscribed: any; track: { attach: () => any; }; }) => {
      if (publication.isSubscribed) {
        trackSubscribed(publication.track);
      }
    });
    
    document.body.appendChild(participantDiv);

    const trackUnsubscribed = (track: { detach: () => any[]; }) => {
      track.detach().forEach((element) => element.remove());
    };

    participant.on("trackUnsubscribed", trackUnsubscribed);

  }

  const joinRoom = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  const response = await generateToken({type: "video"})
  const token = response?.data.token;

  setSection("select a device")
  // setSection("button")
  const localTracks = await createLocalTracks({
    audio: true,
    video: { width: 640 },
  });
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    room = await connect(token, {
      name: "telemedicineAppointment",
      tracks: localTracks,
    });
  } catch (error) {
    console.log(error);
  }
 // doctor's video container
  const localMediaContainer: any = document.getElementById("local-media-container");
  localTracks.forEach((localTrack: any) => {
    localMediaContainer.appendChild(localTrack.attach());
  });

  // display video/audio of other participants who have already joined
  room.participants.forEach(onParticipantConnected);

  // subscribe to new participant joining event so we can display their video/audio
  room.on("participantConnected", onParticipantConnected);

  room.on("participantDisconnected", onParticipantDisconnected);

  event.preventDefault();
}

  const leaveRoom = async(event: any) => {
    console.log(room);
  }

   
  return ( 
    <Fragment>

    <Grid>
      <HeadMeta title={`${fullname} - Holistic Health | Vien Health`}>

        <div id="video-container" />

        <div className="patient__notes">
          {/* {!appointmentDetails && (
            <p>loading...</p>
          )} */}
          <Info className="info">
            <img src={appointmentDetails?.patient_id?.basicInfo?.image || process.env.REACT_APP_PLACEHOLDER_PROFILE_PICTURE} alt="avatar" />
            <div className="">
              <p className="navy-blue-text font-weight-600 font-size-18 mb-0">
                {fullname}
              </p>
              {appointmentDetails?.isFollowUp &&
              <span className="gray-text font-weight-400">Follow up</span>}
            </div>
          </Info>
          <StyledTab defaultActiveKey="clinical" id="uncontrolled-tab-example">
            {tabs.map(({name, slug, component}, key) => (
              <Tab eventKey={slug} title={name} key={key}>
                {component}
              </Tab>
              ))}
          </StyledTab>
        </div>
      </HeadMeta>
    </Grid>
    </Fragment>
  );

}


const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: minmax(0, 1fr) 452px;
  div {
    overflow: hidden;
  }
  video {
    height: 100%;
    width: 100%;
  }
  .patient__notes {
    overflow-y: auto;
    background-color: var(--off-white);
  }
`;


const Info = styled.div`
  display: flex;
  gap: 8px;
  padding: 32px;
  align-items: center;
  color: red;

  img {
    border-radius: 16px;
    width: 60px;
    height: 60px;
    object-fit: cover;
    object-position: center;
    background-color: var(--gray);
  }
`

const StyledTab = styled(Tabs)`
  .nav-link {
    margin-right: 27px !important;
  }
`
 
export default Notes;