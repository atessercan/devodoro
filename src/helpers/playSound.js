import notificationSound from '../assets/space_signal.mp3';

const playSound = (props) => {
  const notify = new Audio(notificationSound);
  notify.muted = props === 'muted';
  notify.play();
};

export default playSound;
