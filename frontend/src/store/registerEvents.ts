import { updateSongAction } from "./currentSongReducer";
import { updatePlayerAction } from "./playerReducer";
import { store } from "./store";

window.runtime.EventsOn("update-player", (state) => {
    console.log(state);
    store.dispatch(updatePlayerAction(state));
});

window.runtime.EventsOn("update-song", (song) => {
    console.log(song);
    store.dispatch(updateSongAction(song));
});
