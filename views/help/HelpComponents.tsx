import {Text} from 'react-native';
import { typography } from '../../styles/typography';

interface HelpProps{
    text:string;
}
export function HelpHead({ text }:HelpProps){
    return <Text style={typography.h3}>{text}</Text>
}

export function HelpListItem({ text }:HelpProps){
    return <Text style={typography.body}>{`${text}`}</Text>
}

