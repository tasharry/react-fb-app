import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_FAIL
} from '../constants/Page'

const initialState = {
    year: 2018,
    photos: [],
    fetching: false,
    error: ''
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return {...state, year: action.payload, error: '', fetching: true};
        case GET_PHOTOS_SUCCESS:
            return {...state, photos: action.payload, error: '', fetching: false};
        case GET_PHOTOS_FAIL:
            return {...state, error: action.payload.message, fetching: false};
        default:
            return state;
    }
}
