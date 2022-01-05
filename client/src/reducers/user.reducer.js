import { GET_USER } from "../actions/user.actions";
import { UPLOAD_PICTURE } from "../actions/user.actions";
import { UPDATE_BIO } from "../actions/user.actions";
import { FOLLOW_USER } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            };
        case FOLLOW_USER:
            return {
                ...state,
                idToFollow: action.payload,
            };
        default:
            return state;
    }
}