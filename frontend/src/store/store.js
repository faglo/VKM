import { createStore, combineReducers } from "redux";
import { currentSongReducer } from "./currentSongReducer";


const rootReducer = combineReducers({
    currentSong: currentSongReducer,
})

export const store = createStore(rootReducer)