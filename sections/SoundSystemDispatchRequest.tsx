import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../components/ScrollScreen';
import MyModal from '../components/MyModal';
import BigForm from '../components/BigForm';
import FormStrip from '../components/FormStript';
import ListItemWithButton from './ListItemwithButton';
import DispText from '../components/DispText';
import Button from '../components/Button';

//interfaces
import Dispatch from '../scripts/interfaces/dispatch';

//enum
import DispatchStatus from '../scripts/enums/dispatch';

//scripts
import User from '../scripts/classes/user';
import toaster from '../scripts/utils/toaster';

//auth
import storage from '../scripts/auth/storage';


export default function SoundSystemDispatchRequest() {
    const [dispatches, setDispatches] = useState<Dispatch[]>([]);
    const [data, setData] = useState<Dispatch[]>([]);
    const [selectedItem, setSelectedItem] = useState<Dispatch | undefined>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    function mountModal(item: Dispatch) {
        toggleModal();
        setSelectedItem(item);
    }

    function unmountModal() {
        toggleModal();
        setSelectedItem(undefined);
    }

    async function requestDispatch() {
        if (user && selectedItem !== undefined) {
            await user.packForDispatch(selectedItem.dispatchid);
            setTimeout(() => {
                toaster('Dispatch status update successful', 'success');
            }, 3000);
            unmountModal();
        }
    }

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const acc = new User(id, key);
                const disp = await acc.soundSystemDispatches();

                if (disp !== undefined) setDispatches(disp);
                setUser(acc);
            }
        })();
    }, []);

    useEffect(() => {
        setData(dispatches.filter(d => d.dispatched === DispatchStatus.Dispatched));
    }, [dispatches]);

    return (
        <ScrollScreen>
            {
                data.length > 0 ? data.map((d) => <ListItemWithButton
                    key={d.dispatchid}
                    rowOneData={{ label: 'Name', text: d.name }}
                    rowTwoData={{ label: 'Location', text: d.dlocation }}
                    buttonLabel='Actions'
                    fun={() => mountModal(d)}
                />) : <DispText text={'No unreturned equipment found'} />
            }
            <MyModal
                visible={showModal}
                onClose={() => unmountModal()}
                title='Request Dispatch'
            >
                <BigForm>
                    <FormStrip>
                        <Button
                            label='Close'
                            fun={() => unmountModal()}
                        />

                        <Button
                            label='Request'
                            fun={async () => requestDispatch()}
                        />
                    </FormStrip>
                </BigForm>
            </MyModal>
        </ScrollScreen>
    );
}