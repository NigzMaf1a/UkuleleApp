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
                    <LabelledText label='ID' text={String(service.ServiceID)} />
                    <LabelledText label='Type' text={service.ServiceType} />
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
                <LabelledText label='Service ID' text={String(service.ServiceID)} />
                <LabelledText label='Genre' text={service.Genre} />
                <LabelledText label='Cost' text={String(service.Cost)} />
                <LabelledText label='Hours' text={String(service.Hours)} />
                <LabelledText label='Type' text={service.ServiceType} />
                <LabelledText label='Status' text={service.ServiceStatus} />
                <LabelledText label='Payment' text={String(service.PaymentStatus)} />
            </MyModal>
        </>
    );
}