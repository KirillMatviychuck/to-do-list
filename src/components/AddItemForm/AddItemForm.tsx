import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';

type AddItemFormPropsType = {
    addTodolist: (text: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm')
    let [newTextForInput, setNewTextForInput] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTextForInput(e.currentTarget.value)
    const onClickHandler = () => {
        if (newTextForInput.trim() !== '') {
            props.addTodolist(newTextForInput)
            setNewTextForInput('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            onClickHandler()
        }
    }

    return (
        <div>
            <TextField value={newTextForInput}
                       variant={'outlined'}
                       color={'primary'}
                       label={'Type value'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
                       />

            <IconButton color={'primary'} onClick={onClickHandler}> <AddCircleIcon/></IconButton>
        </div>
    )
})

