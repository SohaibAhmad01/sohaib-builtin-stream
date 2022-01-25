import stream from "../Api/stream";
import { SIGN_IN,
         SIGN_OUT,
        CREATE_STREAM ,
        FETCH_STREAMS,
        FETCH_STREAM,
        EDIT_STREAM,
        DELETE_STREAM,
        } from "./typeof";
import History from '../History';


export  const signIn=(userId)=>{
    return{
        type:SIGN_IN,
        payload: userId

    };
};
export const signOut=()=>{
    return{
        type:SIGN_OUT
    }
}
export const createStream = (formValues) => async (dispatch, getState) => {
    const {userId}=getState().auth;
    const response = await stream.post('/streams', {...formValues, userId});
  
    dispatch({ type: CREATE_STREAM, payload: response.data });

    History.push('/')
  };
  
  export const fetchStreams = () => async dispatch => {
    const response = await stream.get('/streams');
  
    dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
  
  export const fetchStream = (id) => async dispatch => {
    const response = await stream.get(`/streams/${id}`);
  
    dispatch({ type: FETCH_STREAM, payload: response.data });
  };
  
  export const editStream = (id,formValues) => async dispatch => {
    const response = await stream.patch(`/streams/${id}`, formValues);
  
    dispatch({ type: EDIT_STREAM, payload: response.data });
    
    History.push('/');
  };
  
  export const deleteStream = id => async dispatch => {
    await stream.delete(`/streams/${id}`);
  
    dispatch({ type: DELETE_STREAM, payload: id });
    History.push('/');
  };