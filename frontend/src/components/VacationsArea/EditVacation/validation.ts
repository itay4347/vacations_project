import * as yup from 'yup';
import Vacation from '../../../models/Vacation';

const validateEndDate = (dateInputValue:string,startDateInputValue:string,) => {
    
    const startDateEntered = new Date(startDateInputValue);
    const dateEntered = new Date(dateInputValue);

    if(dateEntered < startDateEntered){
        return "End Date can't be before the start date"
    }
    return true;

}
const validateStartDate = (dateInputValue:string,endDateInputValue:string,) => {
    
    const endDateEntered = new Date(endDateInputValue);
    const dateEntered = new Date(dateInputValue);

    if(dateEntered > endDateEntered){
        return "Start Date can't be after the end date"
    }
    return true;

}

export default {

    destination:{
        required:{value:true,
                  message:'missing destination'},
        minLength:{value:2,
                   message:'destination must have 2 chars or more'},
        maxLength:{value:20,
                   message:'destination cant exceed 20 chars'}
    },
    description:{
        required:{value:true,
                  message:'missing destination'},
        minLength:{value:2,
                   message:'description must have 2 chars or more'},
    },
    startDate:{
        required:{value:true,
                  message:'missing start date'},
        validate:(valueEntered:string,allValues:Vacation) => {
            const isValid = validateStartDate(valueEntered,allValues.endDate);

            if (typeof isValid === 'string'){
                return isValid;
            }
            return true
        }
    },
    endDate:{
        required:{value:true,
                  message:'missing end date'},
        validate:(valueEntered:string,allValues:Vacation) => {
                    const isValid = validateEndDate(valueEntered,allValues.startDate);
        
                    if (typeof isValid === 'string'){
                        return isValid;
                    }
                    return true
                }
    },
    price:{
        required:{value:true,
                  message:'missing price'},
        min:{value:50,
                   message:'destination must have 2 chars or more'},
    },
    image:{}
}