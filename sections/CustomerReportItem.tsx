import React, { useState } from 'react';

//components
import Strip from '../components/Strip';
import Tray from '../components/Tray';
import LabelledText from '../components/LabelledText';
import Button from '../components/Button';
import MyModal from '../components/MyModal';

//interfaces
import Services from '../scripts/interfaces/services';

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
            <Strip>
                <Tray>
                    <LabelledText label='ID' text={String(service.serviceid)} />
                    <LabelledText label='Type' text={service.servicetype} />
                </Tray>
                <Button label='View' fun={() => toggleModal()} />
            </Strip>

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