import React, {useState, useReducer, useCallback} from 'react'

function formreducer(state, action){
    switch(action.type){

        case 'email':
            return{
             ...state,
             email : action.payload
        }

        case 'password':
            return{
             ...state,
             password : action.payload
        }

        case 'passwordrepeat':
            return{
                ...state,
                passwordrepeat: action.payload
            }

 
    }
   
}
const useForm = (initialState) =>{
    const[formdata, formstatedispatch] = useReducer(formreducer, initialState)
    

    const handleinputchange = useCallback(
        (event) => {
            formstatedispatch(
                {
                    type: event.target.name,
                    payload: event.target.value,
                }
            )
        },
        [],
    )

    return [formdata, formstatedispatch, handleinputchange]
      
}

export default useForm