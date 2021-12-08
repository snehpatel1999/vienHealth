import * as React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap'
import styled from 'styled-components'

import Close from './Icons/Close';

export interface ModalProps {
    show: boolean;
    close?: boolean;
    fullscreen?: any;
    className?: string;
    onHide: () => void;
    children: React.ReactNode;
}
 
const Modal: React.FC<ModalProps> = ({ className, children, show, onHide, fullscreen, close = true,  ...props}) => {
    return (  
        <BootstrapModal show={show} onHide={onHide} {...props} fullscreen={fullscreen}>
            <ModalBody className={className}>
                {close && <ModalClose onClick={onHide} size={20} />}
                {children}
            </ModalBody>
        </BootstrapModal>
     );
}





/**
 * styles
 */
const ModalBody = styled(BootstrapModal.Body)`
    position: relative;
    overflow-y: auto;
`;

const ModalClose = styled(Close)`
  top: 32px;
  right: 32px;
  cursor: pointer;
  position: absolute;
`;


export default Modal;