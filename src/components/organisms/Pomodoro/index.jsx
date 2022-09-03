import React from 'react';
import ButtonGroup from '../../molecules/ButtonGroup';
import PomoNav from '../../molecules/PomoNav';
import Timer from '../../molecules/Timer';

function Pomodoro() {
  return (
    <>
      <PomoNav />
      <Timer />
      <ButtonGroup />
    </>
  );
}

export default Pomodoro;
