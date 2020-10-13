import { GET_OPTIMIZE } from "../contants/ActionTypes";

const INIT_STATE = {
    playerData: [],
    optimize: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_OPTIMIZE:
            return { 
                ...state,
                optimize: action.payload
             }
        default:
            return { ...state };
    }
}
