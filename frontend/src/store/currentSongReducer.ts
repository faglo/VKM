import { AnyAction } from "redux";

interface CurrentSongState {
    valid: boolean;
    name?: string;
    artist?: string;
    artwork?: string;
}

const defaultState: CurrentSongState = {
    valid: false,
    name: null,
    artist: null,
    artwork: null,
};

export const UPDATE_SONG = "UPDATE_SONG";

export const currentSongReducer = (
    state = defaultState,
    action: AnyAction & { payload: CurrentSongState }
) => {
    switch (action.type) {
        case UPDATE_SONG:
            return action.payload;
        default:
            return state;
    }
};

export const updateSongAction = (payload) => ({ type: UPDATE_SONG, payload });
