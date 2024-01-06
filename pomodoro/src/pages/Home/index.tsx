import { HandPalm, Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmmountInput,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./Components/NewCycleForm";
import { CountDown } from "./Components/CountDown";

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutes: zod.number().min(1).max(60, "valida"),
});

// interface NewCycleFormData {
//     task: string,
//     minutes: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>;

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptedDate?: Date;
  completionDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);
  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState(0);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            cycles.map((cycle) => {
              if (cycle.id == activeCycleId) {
                return { ...cycle, completionDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setActiveCycleId(null);
        } else {
          setAmmountSecondsPassed(secondsDifference);
        }

        setAmmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormSchema),
      defaultValues: {
        minutes: 0,
        task: "",
      },
    });

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - ammountSecondsPassed : 0;

  const minutesAmmount = Math.floor(currentSeconds / 60);
  const secondsAmmount = currentSeconds % 60;

  const minutesToShow = String(minutesAmmount).padStart(2, "0");
  const secondsToShow = String(secondsAmmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesToShow}:${secondsToShow} - NAI Pomodoro`;
    }
  }, [minutesToShow, secondsToShow]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    console.log(data);
    setActiveCycleId(newCycle.id);
    setAmmountSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      cycles.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  const task = watch("task");

  console.log(formState.errors);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} /> Começar
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={!task} type="submit">
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
