const setTime = (duration, display) => {
  let timer = duration;
  let minutes;
  let seconds;
  setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // eslint-disable-next-line no-param-reassign
    display.textContent = `${minutes}:${seconds}`;

    // eslint-disable-next-line no-plusplus
    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
};

export default setTime;
