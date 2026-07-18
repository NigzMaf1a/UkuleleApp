import React, { useEffect, useState } from 'react';

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
import Cart from '../../../scripts/utils/cart';

//enums
import { EquipmentDescription } from "../../../scripts/enums/equipment";
import { OrderStatus } from "../../../scripts/enums/order";

//auth
import storage from '../../../scripts/auth/storage';

//interfaces
import Supply from '../../../scripts/interfaces/supply';
import SupplyOrder from '../../../scripts/interfaces/supplyOrder';
import { CartItem } from '../../../scripts/utils/cart';


export default function InventorySupplies() {
    const [supplies, setSupplies] = useState<Supply[]>([]);
    const [selectedSupply, setSelectedSupply] = useState<Supply | undefined>();
    const [storeman, setStoreman] = useState<Storeman>();

    //modal state
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showCart, setShowCart] = useState<boolean>(false);

    //cart state
    const [currentCartItem, setCurrentCartItem] = useState<CartItem | undefined>();
    const [cart, setCart] = useState<Cart>();
    const [orderQty, setOrderQty] = useState<number>(0);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    function toggleCart() {
        setShowCart(prev => !prev);
    }

    function closeCart() {
        if (showCart === true) toggleCart();
    }

    function mountModal(sup: Supply) {
        setSelectedSupply(sup);
        toggleModal();
    }

    function unmountModal() {
        setOrderQty(0);
        setSelectedSupply(undefined);
        if (showModal === true) toggleModal();
    }

    function addToCart() {
        if (cart) {
            cart.addItem(currentCartItem as CartItem);
            setOrderQty(currentCartItem?.quantity ?? 0);

            toaster('Item added successfully', 'success');
        }
    }

    function returnCartItem(): CartItem {
        return {
            productId: selectedSupply?.supplyid as number,
            quantity: orderQty,
            price: selectedSupply?.price as number,
        }
    }

    async function checkout() {
        if (cartItems.length > 0) {
            for (const item of cartItems) {
                const payload: SupplyOrder = {
                    supplyid: item.productId,
                    orderdate: date(),
                    orderamount: Number((() => item.price * item.quantity)()),
                    orderstatus: OrderStatus.Processing,
                    items: [
                        {
                            supplytype: supplies?.find(s => s.supplyid === item.productId)?.supplytype as EquipmentDescription,
                            quantity: item.quantity
                        }
                    ]
                }

                await storeman?.orderSupplies(payload);
                toaster(`${supplies?.find(s => s.supplyid === item.productId)?.supplytype as EquipmentDescription} ordered successfully`, 'info');
            }
        }
    }

    useEffect(() => {
        const all = cart?.getItems();
        if (typeof all !== 'undefined') setCartItems(all);
    }, [cart?.getItems().length]);

    useEffect(() => {
        const item = returnCartItem();
        if (typeof item !== 'undefined') setCurrentCartItem(item);
    }, [selectedSupply, orderQty]);

    useEffect(() => {
        (async () => {
            const id = await storage.get.profile().then(prof => prof?.RegID);
            const key = await storage.get.key().then(key => key);
            if (typeof id === 'number' && typeof key === 'string') {
                const manager = new Storeman(id, key);
                const sup = await manager.getSupplies();
                const c = new Cart(id);
                setCart(c);
                setStoreman(manager);
                setSupplies(sup);
            }
        })();
    }, []);

    return (
        <ScrollScreen>
            {
                supplies.length > 0 ? supplies.map((s) => <ListItemWithButton
                    rowOneData={{ label: 'Supplier Name', text: s.suppliername }}
                    rowTwoData={{ label: 'Supply Type', text: s.supplytype }}
                    buttonLabel='View'
                    fun={() => mountModal(s)}
                />) : <DispText text='No supplies available' />
            }

            <MyModal
                visible={showModal}
                onClose={() => unmountModal}
                title='Supply Detail'
            >
                <BigForm>
                    <LabelledText
                        label='Supplier name'
                        text={selectedSupply?.suppliername as string}
                    />

                    <LabelledText
                        label='Supply type'
                        text={selectedSupply?.supplytype as string}
                    />

                    <LabelledText
                        label='Available units'
                        text={String(selectedSupply?.availableunits)}
                    />

                    <FormStrip>
                        <Button
                            label='Close'
                            fun={() => unmountModal()}
                        />
                        <Button
                            label='Add'
                            fun={() => addToCart()}
                        />
                    </FormStrip>
                </BigForm>
            </MyModal>

            <MyModal
                visible={showCart}
                onClose={() => closeCart()}
                title='Cart'
            >
                <BigForm>
                    {
                        cartItems && cartItems.map((c) => <ListItemWithButton
                            key={c.productId}
                            rowOneData={{ label: 'Price', text: String(c.price) }}
                            rowTwoData={{ label: 'Total', text: String((() => c.price * c.quantity)()) }}
                            buttonLabel='Remove'
                            fun={() => cart?.removeItem(c.productId)}
                        />)
                    }
                    <FormStrip>
                        <Button
                            label='Close'
                            fun={() => closeCart()}
                        />
                        {
                            cartItems &&
                            <Button
                                label='Check Out'
                                fun={async () => {
                                    try {
                                        await checkout();
                                        setTimeout(() => {
                                            toaster('Order made successfully', 'success');
                                        }, 3000)
                                    } catch (error) {
                                        toaster('Failed to make order', 'danger');
                                    }
                                }}
                            />
                        }
                    </FormStrip>
                </BigForm>
            </MyModal>
        </ScrollScreen>
    );
}