const setAnimationDuration = (duration) => {
  document.getElementById('hand1').style.animationDuration = `${duration}s`;
  document.getElementById('hand2').style.animationDuration = `${duration}s`;
};

export default setAnimationDuration;
