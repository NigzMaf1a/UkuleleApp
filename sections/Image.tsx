import { Image, View } from "react-native";

//styles
import { imageStyles } from "../styles/imageStyles";

interface ImageContProps{
    link?:string;
}

export default function ImageCont({link}:ImageContProps){
    return (
        <View style={imageStyles.imgCont}>
            <Image src={String((():string =>{
                if(link && typeof link === 'string'){
                    return link;
                } else {
                    return './person'
                }
            })())} style={imageStyles.responsiveImage}/>
        </View>
    );
}

