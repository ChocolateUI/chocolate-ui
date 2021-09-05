import { createContext } from "react";
import DateManagerState from './dateManager'


interface Provider {
  defaultValue: (value: DateManagerState, onSelectDate: ) => void
}
export default createContext<Provider>(Cell);