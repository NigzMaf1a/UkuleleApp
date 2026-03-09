import React, {useState, useEffect} from 'react';
import { View, Modal } from 'react-native';

//components
import Screen from '../components/Screen';
import LabelledText from '../components/LabelledText';
import Button from '../components/Button';
import Strip from '../components/Strip';

//styles
import { cardStyles } from '../styles/cardStyles';

//interfaces
import Order from '../scripts/interfaces/orders';
import Supply from '../scripts/interfaces/supply';

//enums
import { EquipmentDescription } from '../scripts/enums/equipment';
import { OrderStatus } from '../scripts/enums/order';

interface OrderListItemProps{
    order:Order;
    supplies:Supply[];
    fun:(par?:string | number) => Promise<void> | void;
}

export default function OrderListItem({order, supplies, fun}:OrderListItemProps) {
    const [description] = useState<EquipmentDescription>(getDescription());
    const [showModal, setShowModal] = useState<boolean>(false);

    function getDescription():EquipmentDescription{
        return supplies.find(supply => supply.SupplyID === order.OrderID)?.SupplyType as EquipmentDescription;
    }

    function toggleModal(){
        setShowModal(prev => !prev);
    }

  return (
    <>
        <View style={cardStyles.strip}>
            <View style={cardStyles.tray}>
                <LabelledText label={'ID'}
                            text={String(order.OrderID)}
                />

                <LabelledText label={'Date'}
                            text={String(order.OrderDate)}
                />
            </View>
            <Button label={order.OrderStatus.toLowerCase()} fun={() => toggleModal()}/>
        </View>
        {
            showModal && <Modal>
                <Screen>
                    <LabelledText label='Order ID:' text={String(order.OrderID)}/>
                    <LabelledText label='Supply ID:' text={String(order.SupplyID)}/>
                    <LabelledText label='Order Date:' text={String(order.OrderDate)}/>
                    <LabelledText label='Description:' text={description}/>
                    <LabelledText label='Order Items:' text={String(order.OrderItems)}/>
                    <LabelledText label='Order Amount:' text={String(order.OrderAmount)}/>
                    <LabelledText label='Amount:' text={String(order.TotalAmount)}/>
                    <LabelledText label='Order Status:' text={order.OrderStatus}/>
                    <Strip>
                        <Button label={'Close'} fun={() => toggleModal()}/>
                        <Button label={ order.OrderStatus === OrderStatus.Processing ? 'Haul' : order.OrderStatus === OrderStatus.Hauled ? 'Delivered' : 'Cancel' }
                                fun={fun}
                        />
                    </Strip>
                </Screen>
            </Modal>
        }
    </>
  );
}