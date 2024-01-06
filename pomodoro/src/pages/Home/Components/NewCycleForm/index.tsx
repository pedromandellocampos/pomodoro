import { FormContainer, MinutesAmmountInput, TaskInput } from "./styles";

export function NewCycleForm(){
    return(<FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput type="text" list="task-suggestions" id="task" placeholder="Dê um nome para o seu projeto" {...register('task')} />
        
        <datalist id="task-suggestions">
            <option value="projeto1" />
        </datalist>
        
        <label htmlFor="minuteAmount">durante</label>
        <MinutesAmmountInput type="number" id="minuteAmount" placeholder="00" step={1} {...register("minutes", {valueAsNumber: true})}/>

        <span>minutos.</span>
    </FormContainer>)
}