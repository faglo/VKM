import { combineReducers, createStore } from "redux";
import { currentSongReducer } from "./currentSongReducer";
import { playerReducer } from "./playerReducer";
import "./registerEvents";

const rootReducer = combineReducers({
    player: playerReducer,
    currentSong: currentSongReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
