import React, {useState, useEffect} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItem from '../../../sections/ListItem';
import DispText from '../../../components/DispText';
import FancyLoad from '../../../sections/FancyLoad';

//scripts
import Accountant from '../../../scripts/classes/accountant';
import Finance from '../../../scripts/interfaces/finance';

//auth
import storage from '../../../scripts/auth/storage';


export default function AccountantReport() {
    const [data, setData] = useState<Finance[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    

    useEffect(()=>{
        setLoading(true);
        (async ()=>{
            const id = await storage.get.profile().then(prof => prof?.regID);
            const key = await storage.get.key().then(key => key);
            if(typeof id === 'number' && typeof key === 'string' ){
                const acc = new Accountant(id, key);
                const f = await acc?.getAllFinanceRecords();
                setData(f)                
            }
        })();
        setLoading(false);
    }, []);

  return (
    <ScrollScreen>
        { loading}
        {
            data.length > 0 ? data.map((record) => <ListItem    key={record.TransactionID} 
                                                                rowOneData={{label:'Code', text:record.TransactionName}}
                                                                rowTwoData={{label:'Amount', text:String(record.Amount)}}
                                                                rightSideText={record.TransactionStatus}
            />) : <DispText text={'No records to display'}/>
        }
    </ScrollScreen>
  );
}