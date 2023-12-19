import { Play } from "phosphor-react";
import { Header } from "../../componentes/Header/index";
import { CountDownContainer, FormContainer, HomeContainer, Separator } from "./styles";

export function Home(){
    return (
    <HomeContainer>
        <form action="">
            <FormContainer>
                <label htmlFor="task">Vou trabalhar em</label>
                <input type="text" name="" id="task" />
                <label htmlFor="minuteAmount">durante</label>
                <input type="text" id="minuteAmount" />

                <span>minutos.</span>
            </FormContainer>

        

        <CountDownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
        </CountDownContainer>
        
        <button type="submit"><Play /> Começar</button>

        </form>
    </HomeContainer>
    )

}