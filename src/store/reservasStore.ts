import {create} from "zustand"


type State = {
  currentDate: Date,
}

type Actions = {
  setCurrentDate: (data: Date) => void;
}


export const reservaStore = create<State & Actions>((set)=> ({
  currentDate: new Date(),
  setCurrentDate: (data) => set({currentDate: data}) 
})) 