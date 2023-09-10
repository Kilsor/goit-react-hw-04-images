import React, { useEffect } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

export const Modal = ({ src, alt, onClose }) => {
  const handleKeyPress = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleCloseClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Overlay onClick={handleCloseClick}>
      <ModalContainer>
        <img src={src} alt={alt} />
      </ModalContainer>
    </Overlay>
  );
};
