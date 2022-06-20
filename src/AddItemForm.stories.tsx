import {AddItemForm} from "./AddItemForm";
import React from 'react'

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addTodolist={(text: string) => {alert(text)}}/>
}