import _ from 'lodash';
import { CREATE_STREAM, EDIT_STREAM, DELETE_STREAM, FETCH_STREAM, FETCH_STREAMS } from "../actions/types";

export default (state={}, action) => {
    switch(action.type) {
        case EDIT_STREAM: 
            //key interpolation:  const newState={...state}; return nnewState[action.payload.id] = action.payload
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        case FETCH_STREAMS:
            //mapKeys lodash method to map object to as a value of new object where key is vlaue from the second argument
            //add each stream as a object to our state where object key is stream id and value is object itself
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        default: 
            return state;
    }

}