//enums
import Numbers from "../enums/numbers";

//interfaces
import { DropDownItem } from "../../components/DropDown";

export default function hoursDropDownValues():DropDownItem[]{
    return [
        {
            label:'One',
            value:Numbers.One
        },
        {
            label:'Two',
            value:Numbers.Two
        },
        {
            label:'Three',
            value:Numbers.Three
        },
        {
            label:'Four',
            value:Numbers.Four
        },
        {
            label:'Five',
            value:Numbers.Five
        },
        {
            label:'Six',
            value:Numbers.Six
        },
        {
            label:'Seven',
            value:Numbers.Seven
        },
        {
            label:'Eight',
            value:Numbers.Eight
        },
        {
            label:'Nine',
            value:Numbers.Nine
        },
        {
            label:'Ten',
            value:Numbers.Ten
        },
        {
            label:'Eleven',
            value:Numbers.Eleven
        },
        {
            label:'Twelve',
            value:Numbers.Twelve
        }                                        
    ];
}