/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styles from './index.module.scss';
import Register from '../Register';
import customStyles from '../../../constants/constant';

const modalStyles = { ...customStyles.customStyles };

function Menu() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  function openModal() {
    setIsOpen(true);
    setModalTitle('Login');
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#fff';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className={styles.menu}>
      <span onClick={openModal}>Sercan</span>
      <ReactModal
        closeTimeoutMS={120}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="modal"
      >
        {modalTitle === 'Login' && (
          <Register onClick={closeModal} modalTitle={modalTitle} />
        )}
      </ReactModal>
    </div>
  );
}

export default Menu;
