import { ActionTypes } from "./actions";
import { produce } from "immer";

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptedDate?: Date;
  completionDate?: Date;
}

export function cyclesReducers(state: CyclesState, action: any) {
  console.log(state);
  console.log(action);

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draftState) => {
        draftState.cycles.push(action.payload.newCycle);
        draftState.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id == state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draftState) => {
        draftState.activeCycleId = null;
        draftState.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id == state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draftState) => {
        draftState.activeCycleId = null;
        draftState.cycles[currentCycleIndex].completionDate = new Date();
      });
    }

    default:
      return state;
  }
}
