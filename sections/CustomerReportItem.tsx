import React, { useState } from 'react';
import { View } from 'react-native';

//components
import Strip from '../components/Strip';
import ButtonComplex from '../components/ButtonComplex';
import LabelledText from '../components/LabelledText';
import Button from '../components/Button';
import MyModal from '../components/MyModal';
import LabelledButtonAdv from '../components/revisited/cutting edge/LabelledButtonAdv';

//interfaces
import Services from '../scripts/interfaces/services';

//styles
import revisited_styles from '../components/revisited/styles/styles';

interface CustomerReportProps {
    service: Services;
}

export default function CustomerReportItem({ service }: CustomerReportProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    return (
        <>
            <View style={revisited_styles.container}>
                <View style={revisited_styles.left_cont}>
                    <LabelledText label='ID' text={String(service.serviceid)} />
                    <LabelledText label='Type' text={service.servicetype} />
                </View>
                <View style={revisited_styles.right_cont}>
                    <LabelledButtonAdv
                        label='View'
                        onPress={() => toggleModal()}
                        variant='success'
                    />
                </View>
            </View>

            <MyModal
                visible={showModal}
                onClose={toggleModal}
                title="Service Details"
                footer={
                    <Strip>
                        <Button label='Close' fun={() => toggleModal()} />
                    </Strip>
                }
            >
                <LabelledText label='Service ID' text={String(service.serviceid)} />
                <LabelledText label='Genre' text={service.genre} />
                <LabelledText label='Cost' text={String(service.cost)} />
                <LabelledText label='Hours' text={String(service.hours)} />
                <LabelledText label='Type' text={service.servicetype} />
                <LabelledText label='Status' text={service.servicestatus} />
                <LabelledText label='Payment' text={String(service.paymentstatus)} />
            </MyModal>
        </>
    );
}