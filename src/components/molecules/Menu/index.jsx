/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactModal from 'react-modal';
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri';
import styles from './index.module.scss';
import Login from '../Login';
import customStyles from '../../../constants/constant';
import AuthContext from '../../../context/auth-context';
import { logout } from '../../../helpers/firebase';

const modalStyles = { ...customStyles.customStyles };

function Menu() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Login');
  const [toggleLogout, setToggleLogout] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const userRef = useRef();
  function openModal() {
    setIsOpen(true);
    setModalTitle('Login');
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#fff';
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleHandler = () => {
    setToggleLogout((prevState) => !prevState);
  };

  const logoutHandler = async () => {
    const logState = await logout();
    if (logState) {
      setCurrentUser(null);
      toggleHandler();
    }
  };
  useEffect(() => {
    userRef.current = currentUser;
  }, [currentUser]);
  return (
    <div className={styles.menu}>
      {!currentUser ? (
        <div className={styles['login-menu']} onClick={openModal}>
          <div className={styles['login-menu']}>
            <span>Login</span>
            <RiLoginBoxLine />
          </div>
        </div>
      ) : (
        // username and logout functions comes here
        <div onClick={toggleHandler}>{currentUser}</div>
      )}
      <ReactModal
        closeTimeoutMS={120}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          ...modalStyles,
          content: { ...modalStyles.content, maxHeight: '550px' },
        }}
        contentLabel="modal"
      >
        {modalTitle === 'Login' && <Login setIsOpen={setIsOpen} />}
      </ReactModal>
      {toggleLogout && (
        <div className={styles['logout-button']}>
          <RiLogoutBoxLine />
          <span onClick={logoutHandler}>Logout</span>
        </div>
      )}
    </div>
  );
}

export default Menu;
