import {View, Text, TouchableOpacity} from "react-native";

//styles
import buttons from "../../../styles/buttons";
import headings from "../../../styles/headings";
import structure from "../../../styles/structure";

export default function BookBand(){
    return(
        <View style={structure.container}>
            <Text style={headings.head24}>Book Band</Text>
            <View style={[structure.column, {gap: 14}]}>
                <TouchableOpacity style={buttons.btn_green}>
                    <Text>Book</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}