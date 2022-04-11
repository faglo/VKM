const defaultState = {
    valid: false,
    name: null,
    artist: null,
    artwork: null,
}

export const UPDATE_SONG = "UPDATE_SONG"

export const currentSongReducer = (state = defaultState, action) => {
    switch(action.type) {
        case UPDATE_SONG:
            return action.payload
        default:
            return state
    }
}

export const updateSongAction = (payload) => ({type: UPDATE_SONG, payload})