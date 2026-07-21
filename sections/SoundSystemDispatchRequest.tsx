import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../components/ScrollScreen';
import MyModal from '../components/MyModal';
import BigForm from '../components/BigForm';
import FormStrip from '../components/FormStript';
import ListItemWithButtonAdv from '../components/revisited/cutting edge/ListItemWithButtonAdv';
import DispText from '../components/DispText';
import FancyLoad from './FancyLoad';
import LabelledButtonAdv from '../components/revisited/cutting edge/LabelledButtonAdv';

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
    const [loading, setLoading] = useState<boolean>(false);
    const [btnClicked, setBtnClicked] = useState<boolean>(false);


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

            setDispatches(dispatches.filter(f => f.dispatched === DispatchStatus.Pending));
            setBtnClicked(false);
            unmountModal();
        }
    }

    useEffect(() => {
        async function initialize() {
            try {
                setLoading(true);
                const id = await storage.get.profile().then(prof => prof?.RegID);
                const key = await storage.get.key().then(key => key);
                if (typeof id === 'number' && typeof key === 'string') {
                    const acc = new User(id, key);
                    const disp = await acc.soundSystemDispatches();

                    if (disp !== undefined) setDispatches(disp);
                    setUser(acc);
                } else setDispatches([]);
            } catch (error) {
                console.log('Error occurred while initializing dispatch requests');
                setDispatches([]);
            } finally {
                setLoading(false);
            }
        }

        initialize();
    }, []);

    useEffect(() => {
        setData(dispatches.filter(d => d.dispatched === DispatchStatus.Dispatched));
    }, [dispatches]);

    return (
        <ScrollScreen>
            <FancyLoad loading={loading} />
            {
                data.length > 0 ? data.map((d) => <ListItemWithButtonAdv
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
                        <LabelledButtonAdv
                            label='Close'
                            onPress={() => unmountModal()}
                        />

                        <LabelledButtonAdv
                            label='Request'
                            onPress={async () => requestDispatch()}
                            isClicked={btnClicked}
                            setIsClicked={() => setBtnClicked(true)}
                            variant='success'
                        />
                    </FormStrip>
                </BigForm>
            </MyModal>
        </ScrollScreen>
    );
}