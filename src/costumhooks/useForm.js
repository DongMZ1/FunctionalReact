import React, {useState, useReducer, useCallback} from 'react'

function formreducer(state, action){
    switch(action.type){

        case 'input':
            return{
             ...state,
             [action.name] : action.payload
        }

        default:
            return {...state}

 
    }
   
}
export const useForm = (initialState) =>{
    const[formdata, formstatedispatch] = useReducer(formreducer, initialState)
    

    const handleinputchange = useCallback(
        (event) => {
            formstatedispatch(
                {
                    type: 'input',
                    name: event.target.name,
                    payload: event.target.value,
                }
            )
        },
        [],
    )

    return [formdata, formstatedispatch, handleinputchange]
      
}
