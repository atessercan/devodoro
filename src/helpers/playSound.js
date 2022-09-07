import notificationSound from '../assets/space_signal.mp3';

const playSound = () => {
  const notify = new Audio(notificationSound);

  notify.play();
};

export default playSound;
