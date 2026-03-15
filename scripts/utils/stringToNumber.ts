//utils
import toaster from "./toaster";

export default function stringToNumber(val:string):number{
    if(val !== null){
        const num = Number(val);
        if(typeof num === 'number' && num > 0 ){
            return num;
        }
    }
    toaster('Please enter a valid number', 'danger');
    throw new Error('Invalid input : numbers only accepted');
}