import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./styles";

import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown() {
  const {
    activeCycle,
    ammountSecondsPassed,
    markCycleAsCompleted,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - ammountSecondsPassed : 0;

  const minutesAmmount = Math.floor(currentSeconds / 60);
  const secondsAmmount = currentSeconds % 60;

  const minutesToShow = String(minutesAmmount).padStart(2, "0");
  const secondsToShow = String(secondsAmmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          markCycleAsCompleted();
        } else {
          setSecondsPassed(secondsDifference);
        }

        setSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesToShow}:${secondsToShow} - NAI Pomodoro`;
    }
  }, [minutesToShow, secondsToShow]);

  return (
    <CountDownContainer>
      <span>{minutesToShow[0]}</span>
      <span>{minutesToShow[1]}</span>
      <Separator>:</Separator>
      <span>{secondsToShow[0]}</span>
      <span>{secondsToShow[1]}</span>
    </CountDownContainer>
  );
}
