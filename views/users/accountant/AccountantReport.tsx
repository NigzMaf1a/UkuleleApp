import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import ListItemAdv from '../../../components/revisited/cutting edge/ListItemAdv';
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


    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true);
                const id = await storage.get.profile().then(prof => prof?.RegID);
                const key = await storage.get.key().then(key => key);
                if (typeof id === 'number' && typeof key === 'string') {
                    const acc = new Accountant(id, key);
                    const f = await acc?.getAllFinanceRecords();
                    setData(f)
                } else setData([]);
            } catch (error) {
                console.log('Error while initializing accountant reports', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        }

        initialize();
    }, []);

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />
            {
                data.length > 0 ? data.map((record) => <ListItemAdv key={record.transactionid}
                    rowOneData={{ label: 'Code', text: record.transactionname }}
                    rowTwoData={{ label: 'Amount', text: String(record.amount) }}
                    rightSideText={record.transactionstatus}
                />) : <DispText text={'No records to display'} />
            }
        </ScrollScreen>
    );
}