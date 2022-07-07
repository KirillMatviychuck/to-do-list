import {
    setAppErrorMessage,
    SetAppErrorMessageType,
    setAppProgressStatus,
    SetAppProgressStatusType
} from "../reducers/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleAppServerError = <D> (data: ResponseType<D>, dispatch: Dispatch<SetAppErrorMessageType | SetAppProgressStatusType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessage(data.messages[0]))
    } else {
        debugger
        dispatch(setAppErrorMessage('something go wrong'))
    }
    dispatch(setAppProgressStatus('failed'))
}
export const handleNetworkServerError =  (error: { message: string }, dispatch: Dispatch<SetAppErrorMessageType | SetAppProgressStatusType>) => {
    dispatch(setAppErrorMessage(error.message ? error.message : 'Error occurred'))
    dispatch(setAppProgressStatus('failed'))
}
