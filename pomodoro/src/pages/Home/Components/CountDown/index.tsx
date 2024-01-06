import { CountDownContainer, Separator } from "./styles";

export function CountDown(){
    return(
    <CountDownContainer>
        <span>{minutesToShow[0]}</span>
        <span>{minutesToShow[1]}</span>
        <Separator>:</Separator>
        <span>{secondsToShow[0]}</span>
        <span>{secondsToShow[1]}</span>
    </CountDownContainer>
    )
}