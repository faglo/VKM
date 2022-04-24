import { AnyAction } from "redux";

interface CurrentSongState {
    artist?: string;
    title?: string;
    cover?: string;
    duration?: number;
    id?: number;
}

const defaultState: CurrentSongState = {
    artist: null,
    title: null,
    cover: null,
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
