import { Header } from "../../componentes/Header/index";
import {Outlet} from 'react-router-dom'
import { LayoutContainer } from "./styles";

export function DefaultLayout(){
    return(
        <LayoutContainer>
            <Header />
            <Outlet />
        </LayoutContainer>
    )
}