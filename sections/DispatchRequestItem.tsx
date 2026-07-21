import React, { useState } from 'react';
import { View } from 'react-native';

//components
import LabelledText from '../components/LabelledText';
import Strip from '../components/Strip';
import ButtonComplex from '../components/ButtonComplex';
import Button from '../components/Button';
import MyModal from '../components/MyModal';

//enums
import DispatchStatus from '../scripts/enums/dispatch';

//interfaces
import Dispatch from '../scripts/interfaces/dispatch';

//styles
import revisited_styles from '../components/revisited/styles/styles';

interface DispatchRequestItemProps {
    item: Dispatch;
    fun: (par?: number | string) => Promise<void> | void;
}

export default function DispatchRequestItem({ item, fun }: DispatchRequestItemProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    return (
        <>
            <View style={revisited_styles.container}>
                <View style={revisited_styles.left_cont}>
                    <LabelledText label='ID' text={String(item.dispatchid)} />
                    <LabelledText label='Location' text={item.dlocation} />
                </View>
                <View style={revisited_styles.right_cont}>
                    <ButtonComplex label={item.dispatched} fun={() => toggleModal()} />
                </View>
            </View>

            <MyModal
                visible={showModal}
                onClose={toggleModal}
                title="Dispatch Details"
                footer={
                    <Strip>
                        <Button label='Close' fun={() => toggleModal()} />
                        <Button
                            label={
                                item.dispatched === DispatchStatus.Pending
                                    ? 'Dispatch'
                                    : item.dispatched === DispatchStatus.Dispatched
                                        ? 'Pack'
                                        : 'Return'
                            }
                            fun={fun}
                        />
                    </Strip>
                }
            >
                <LabelledText label='Dispatch ID' text={String(item.dispatchid)} />
                <LabelledText label='Customer ID' text={String(item.customerid)} />
                <LabelledText label='Name' text={String(item.name)} />
                <LabelledText label='Location' text={String(item.dlocation)} />
                <LabelledText label='Service ID' text={String(item.serviceid)} />
                <LabelledText label='Phone' text={item.phoneno} />
                <LabelledText label='Status' text={item.dispatched} />
                <LabelledText label='Date' text={item.dispatchdate} />
            </MyModal>
        </>
    );
}