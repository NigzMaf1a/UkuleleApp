import React, {useState} from 'react';
import { Modal } from 'react-native';

//components
import Screen from '../components/Screen';
import Strip from '../components/Strip';
import Tray from '../components/Tray';
import LabelledText from '../components/LabelledText';
import Button from '../components/Button';
import InputPlusButton from './InputPlusButton';

//enums
import { PenaltyStatus } from '../scripts/enums/penalty';

//interfaces
import Penalty from '../scripts/interfaces/penalty';

interface CustomerPenaltyProps{
    penalty:Penalty;
    fun:(id:number) => Promise<void> | void;
    amountInput:string;
    onAmountInputChange:(par?:string) => Promise<void> | void;
    payPenaltyFun:(par?:string | number) => Promise<void> | void
}

export default function CustomerPenaltyItem({penalty, amountInput, onAmountInputChange, payPenaltyFun}:CustomerPenaltyProps) {
    const[showModal, setShowModal] = useState<boolean>(false);
    const[showModalTwo, setShowModalTwo] = useState<boolean>(false);

    function toggleModal(){
        setShowModal(prev => !prev);
    }

    function toggleModalTwo(){
        setShowModalTwo(prev => !prev);
    }

  return (
    <>
        <Strip>
            <Tray>
                <LabelledText label='Amount' text={String(penalty.Penalty)}/>
                <LabelledText label='Status' text={String(penalty.PenaltyStatus)}/>
            </Tray>
            <Button label='View' fun={()=> toggleModal()}/>
        </Strip>

        {
            showModal && <Modal>
                <Screen>
                    <Strip>
                        <Button label='Close' fun={()=> toggleModal()}/>
                        {
                            penalty.PenaltyStatus === PenaltyStatus.NotPaid && <Button label='Pay' fun={()=> toggleModalTwo()}/>
                        }
                    </Strip>
                </Screen>
            </Modal>
        }

        {
            showModalTwo && <Modal>
                <Strip>
                    <InputPlusButton inputPlaceholder='Enter amount'
                                     btnLabel='Pay'
                                     inputValue={amountInput}
                                     onInputChange={onAmountInputChange}     
                                     btnFun={payPenaltyFun}     
                    />
                </Strip>
            </Modal>
        }
    </>
  );
} 