import React, {useEffect, useState} from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import MyModal from '../../../components/MyModal';
import DispText from '../../../components/DispText';
import Button from '../../../components/Button';
import BigForm from '../../../components/BigForm';
import ListItemWithButton from '../../../sections/ListItemwithButton';
import FormStrip from '../../../components/FormStript';
import LabelledText from '../../../components/LabelledText';

//scripts
import Storeman from '../../../scripts/classes/storeman';
import date from '../../../scripts/utils/date';
import toaster from '../../../scripts/utils/toaster';

//enums
import { EquipmentDescription } from "../../../scripts/enums/equipment";
import { OrderStatus } from "../../../scripts/enums/order";

//auth
import storage from '../../../scripts/auth/storage';

//interfaces
import Supply from '../../../scripts/interfaces/supply';

interface ItemPayload{
    SupplyType:EquipmentDescription;
    Quantity:number;
}

interface  SupplyOrder{
    SupplyID:number;
    OrderDate:Date;
    OrderAmount:number;
    OrderStatus:OrderStatus;
    items:ItemPayload[];
}

enum CartStatus {
    OPEN = "open",
    CHECKED_OUT = "checked_out",
    ABANDONED = "abandoned",
}

interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

class Cart{
    private readonly cartId: number;
    private status: CartStatus = CartStatus.OPEN;

    private items: Map<string, CartItem> = new Map();
    private productIds: Set<string> = new Set();

    constructor(cartId: number) {
        this.cartId = cartId;
    }

    

    addItem():void{

    }
}

export default function InventorySupplies(){
    const [supplies, setSupplies] = useState<Supply[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedSupply, setSelectedSupply] = useState<Supply | undefined>();
    const [orderQty, setOrderQty] = useState<number>(0);
    const [item, setItem] = useState<SupplyOrder>();

    const cart:SupplyOrder[] = [];

    function toggleModal(){
        setShowModal(prev => !prev);
    }

    function mountModal(sup:Supply){
        setSelectedSupply(sup);
        toggleModal();
    }

    function unmountModal(){
        if(showModal === true) toggleModal();
    }

    function addToCart(){
        cart.push(item as SupplyOrder);
        toaster('Item added successfully', 'success');
    }

    function getOrderPrice(price:number, qty:number):number{
        return price * qty;
    }

    function currentPayload():SupplyOrder{
        return {
            SupplyID:selectedSupply?.SupplyID as number,
            OrderDate:date(),
            OrderAmount: orderQty > 0 ? getOrderPrice(selectedSupply?.Price as number, orderQty) : 0,
            OrderStatus:OrderStatus.Processing,
            items:[
                {
                    SupplyType:selectedSupply?.SupplyType as EquipmentDescription,
                    Quantity:orderQty
                }
            ]
        }
    }
    function checkout(){}
    
    useEffect(() => {
        const payload = currentPayload();
        if(typeof payload !== 'undefined') setItem(payload);
    }, [selectedSupply, orderQty]);    

    return 
    <ScrollScreen>
        {
            supplies.length > 0 ? supplies.map((s) => <ListItemWithButton
                rowOneData={{label:'Supplier Name', text:s.SupplierName}}
                rowTwoData={{label:'Supply Type', text:s.SupplyType}}
                buttonLabel = 'View'
                fun={() => addToCart()}
            />) : <DispText text='No supplies available'/>
        }
        <MyModal
            visible = {showModal}
            onClose = {() => unmountModal}
            title='Supply Detail'
        >
            <BigForm>
                <LabelledText
                    label = 'Supplier name'
                    text = {}
                />
            </BigForm>
        </MyModal>()
    </ScrollScreen>
}