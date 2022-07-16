import {
    setAppErrorMessage,
    SetAppErrorMessageType,
    setAppProgressStatus,
    SetAppProgressStatusType
} from "../reducers/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleAppServerError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorMessageType | SetAppProgressStatusType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessage({errorMessage: data.messages[0]}))
    } else {
        dispatch(setAppErrorMessage({errorMessage: 'something go wrong'}))
    }
    dispatch(setAppProgressStatus({status: 'failed'}))
}
export const handleNetworkServerError = (error: { message: string }, dispatch: Dispatch<SetAppErrorMessageType | SetAppProgressStatusType>) => {
    dispatch(setAppErrorMessage({errorMessage: error.message ? error.message : 'Error occurred'}))
    dispatch(setAppProgressStatus({status: 'failed'}))
}
