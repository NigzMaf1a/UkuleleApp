import React, { useState } from 'react';

//components
import Screen from '../components/Screen';
import Strip from '../components/Strip';
import Tray from '../components/Tray';
import Button from '../components/Button';
import LabelledText from '../components/LabelledText';
import MyModal from '../components/MyModal';

//interfaces
import Feedback from '../scripts/interfaces/feedback';

export interface FeedbackProps {
    feedback: Feedback;
}

export default function CustomerFeedbackItem({ feedback }: FeedbackProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    return (
        <>
            <Strip>
                <Tray>
                    <LabelledText label='Comment' text={feedback.Comments} />
                    <LabelledText label='Response' text={String(feedback.Response)} />
                </Tray>
                <Button label='View' fun={() => toggleModal()} />
            </Strip>

            <MyModal
                visible={showModal}
                onClose={toggleModal}
                animationType="slide"
                title='Feedback Details'
                footer={
                    <Strip>
                        <Button label='Close' fun={() => toggleModal()} />
                    </Strip>
                }
            >
                <LabelledText label='Name' text={feedback.Name} />
                <LabelledText label='Comment' text={feedback.Comments} />
                <LabelledText label='Response' text={String(feedback.Response)} />
            </MyModal>
        </>
    );
}
