import { DropDownItem } from "../../components/DropDown";
import { Genre } from "../enums/services";

export default function musicGenres():DropDownItem[]{
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
            label:'Benga',
            value:Genre.Benga
        },
        {
            label:'Zilizopendwa',
            value:Genre.Zilizopendwa
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