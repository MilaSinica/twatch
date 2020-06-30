import streams from '../apis/streams';
import * as types from "./types";
import history from '../history';

export const signIn = (userId) => {
    return {
        type: types.SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: types.SIGN_OUT
    }
}

//async action creator requires middleware - redux-thunk
export const createStream = formValues =>  async (dispatch, getState) => {
    const response = await streams.post('/streams', {...formValues, userId: getState().auth.userId});

    dispatch({
        type: types.CREATE_STREAM,
        payload: response.data
    })

    //programmatic navigation after successfull stream creation to send user back to stream list
    history.push('/');
}

export const editStream = (id, formValues) =>  async dispatch => {
    //we use PATCH instead of PUT because put would replace the whole object and we want to change only separate values
    //so when we try to PUT our object with only 2 props out of 4, it will replace object with a new one with only 2 props
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({
        type: types.EDIT_STREAM,
        payload: response.data
    })

    history.push('/');
}

export const deleteStream = id =>  async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({
        type: types.DELETE_STREAM,
        payload: id
    })

    history.push('/');
}

export const fetchStream = id =>  async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({
        type: types.FETCH_STREAM,
        payload: response.data
    })
}

export const fetchStreams = () =>  async dispatch => {
    const response = await streams.get(`/streams`);

    dispatch({
        type: types.FETCH_STREAMS,
        payload: response.data
    })
}
