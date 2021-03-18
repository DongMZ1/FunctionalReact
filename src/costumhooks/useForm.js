import React, {useState, useReducer, useCallback} from 'react'

function formreducer(state, action){
    switch(action.type){

        case 'addcontent':
            return{
             ...state,
             [action.fieldname] : action.payload
        }

 
    }
   
}
const useForm = ({initialState, validator}) =>{
    const[formdata, formstatedispatch] = useReducer(formreducer, initialState)
    const[error, seterror] = useState(null)

    const handleinputchange = useCallback(
        (event) => {
            const{name, value} = event.target;
            formstatedispatch(
                {
                    type : 'addcontent',
                    fieldname: name,
                    value: payload,
                }
            )
        },
        [],
    )

    return {formdata, formstatedispatch, handleinputchange}
      
}

export default useForm