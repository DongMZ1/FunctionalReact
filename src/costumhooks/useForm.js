import React, {useReducer, useCallback} from 'react'

function formreducer(state, action){
    switch(action.type){

        case 'addcontent':
            return{
             ...state,
             [action.fieldname] : action.payload
        }

 
    }
   
}
const useForm = ({initialState}) =>{
    const[formdata, formstatedispatch] = useReducer(formreducer, initialState)

    const handleinputchange = event =>{
        
    }
    return {formdata, formstatedispatch}
      
}

export default useForm