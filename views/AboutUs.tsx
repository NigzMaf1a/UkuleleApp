import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';

//components
import ScrollScreen from '../components/ScrollScreen';

//interfaces
import About from '../scripts/interfaces/about';

//scripts
import User from '../scripts/classes/user';

//styles
import texts from '../styles/text';

//auth
import storage from '../scripts/auth/storage';

export default function AboutUs() {
    const[about, setAbout] = useState<About>();

    useEffect(()=>{
        (async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const user = new User(id, key);
                const thisAbout = await user?.getAbout();

                setAbout(thisAbout[thisAbout.length - 1]);                
            }
        })();
    }, []);
  return (
    <ScrollScreen>
        <Text style={texts.text_normal}>{about?.detail}</Text>
    </ScrollScreen>
  );
}