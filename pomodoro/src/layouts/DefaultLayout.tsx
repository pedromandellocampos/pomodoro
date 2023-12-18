import { Header } from "../componentes/Header";
import {Outlet} from 'react-router-dom'

export function DefaultLayout(){
    return(
        <div>
            <Header />
            <Outlet />
        </div>
    )
}