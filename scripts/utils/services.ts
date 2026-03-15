import { Genre, ServiceType} from "../enums/services";
import { DropDownItem } from "../../components/DropDown";

function genreDropDownValues():DropDownItem[]{
    return [
        {
            label:'Reggae',
            value:Genre.Reggae
        },
        {
            label:'Rhumba',
            value:Genre.Rhumba
        },
        {
            label:'Zilizopendwa',
            value:Genre.Zilizopendwa
        },
        {
            label:'Benga',
            value:Genre.Benga
        },
        {
            label:'Soul',
            value:Genre.Soul
        },
        {
            label:'RnB',
            value:Genre.RnB
        }
    ];
}
function serviceTypeDropDownValues():DropDownItem[]{
    return [
        {
            label:'Booking',
            value:ServiceType.Booking
        },
        {
            label:'Lending',
            value:ServiceType.Lending
        }
    ];
}

export {genreDropDownValues, serviceTypeDropDownValues}