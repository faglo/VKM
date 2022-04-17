import { combineReducers, createStore } from "redux";
import { currentSongReducer } from "./currentSongReducer";

const rootReducer = combineReducers({
    currentSong: currentSongReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
