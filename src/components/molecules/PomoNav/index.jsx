/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { AiOutlineLineChart, AiOutlineSetting } from 'react-icons/ai';
import ReactModal from 'react-modal';
import styles from './index.module.scss';
import customStyles from '../../../constants/constant';
import Button from '../../atoms/Button';

const modalStyles = { ...customStyles.customStyles };

ReactModal.setAppElement('#root');

function PomoNav() {
  // let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  function openModal(event) {
    setIsOpen(true);
    setModalTitle(event.target.ariaLabel);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#fff';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className={styles['pomo-nav']}>
      <span aria-label="Statistics" onClick={openModal}>
        <AiOutlineLineChart aria-label="Statistics" />
        <h3 aria-label="Statistics">Statistics</h3>
      </span>
      <ReactModal
        closeTimeoutMS={120}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="modal"
      >
        <h2>{modalTitle}</h2>
        <Button name="close" onClick={closeModal} />
        <div>Welcome to {modalTitle}</div>
      </ReactModal>
      <span aria-label="Settings" onClick={openModal}>
        <AiOutlineSetting aria-label="Settings" />
        <h3 aria-label="Settings">Settings</h3>
      </span>
    </div>
  );
}

export default PomoNav;
