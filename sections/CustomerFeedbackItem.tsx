import React, { useState } from 'react';
import { View } from 'react-native';

//components
import Strip from '../components/Strip';
import Button from '../components/Button';
import LabelledText from '../components/LabelledText';
import MyModal from '../components/MyModal';
import ListItemWithButtonAdv from '../components/revisited/cutting edge/ListItemWithButtonAdv';

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
            <ListItemWithButtonAdv
                rowOneData={{ label: 'Comment', text: feedback.comments }}
                rowTwoData={{ label: 'Response', text: feedback.response ? feedback.response : 'No response' }}
                buttonLabel='View'
                fun={() => toggleModal()}
                btn_variant={
                    typeof feedback.response === null ? 'warning' : 'success'
                }
            />

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
                <LabelledText label='Name' text={feedback.name} />
                <LabelledText label='Comment' text={feedback.comments} />
                <LabelledText label='Response' text={String(typeof feedback.response === null ? feedback.response : '-')} />
            </MyModal>
        </>
    );
}
