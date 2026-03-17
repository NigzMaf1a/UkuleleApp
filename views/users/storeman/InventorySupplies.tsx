// import React, {useEffect, useState} from 'react';

// //components
// import ScrollScreen from '../../../components/ScrollScreen';
// import MyModal from '../../../components/MyModal';
// import ListItemWithButton from '../../../sections/ListItemwithButton';
// import DispText from '../../../components/DispText';
// import BigForm from '../../../components/BigForm';
// import FormStrip from '../../../components/FormStript';
// import LabelledText from '../../../components/LabelledText';
// import Button from '../../../components/Button';

// //scripts
// import Storeman from '../../../scripts/classes/storeman';
// import Cart, { CartItem, CartStatus } from '../../../scripts/logic/cart';
// import stringToNumber from '../../../scripts/utils/stringToNumber';

// //auth
// import storage from '../../../scripts/auth/storage';

// //interfaces
// import Supply from '../../../scripts/interfaces/supply';

// //enums
// import { SupplyAvailable } from '../../../scripts/enums/supply';


// export default function InventorySupplies() {
//   const [manager, setManager] = useState<Storeman>();
//   const [supplies, setSupplies] = useState<Supply[]>([]);
//   const [selectedSupply, setSelectedSupply] = useState<Supply | undefined>();
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [quantity, setQuantity] = useState<string>('');

//   useEffect(()=>{
//       ( async ()=>{
//           const id = await storage.get.profile().then(prof => prof?.regID);
//           const key = await storage.get.key().then(key => key);
//           if(typeof id === 'number' && typeof key === 'string' ){
//               const storeman = new Storeman(id, key);
//               const sup = await storeman.getSupplies();

//               setSupplies(sup.filter(s => s.Available === SupplyAvailable.Yes));
//               setManager(storeman);
//           }
//         })();
//   }, []);  

//   function toggleModal(){
//     setShowModal(prev => !prev);
//   }

//   function mountModal(supply:Supply){
//     setSelectedSupply(supply);
//     toggleModal();
//   }

//   function unmountModal(){
//     setSelectedSupply(undefined);
//     toggleModal();
//   }

//   return (
//     <ScrollScreen>
//       {
//         supplies.length > 0 ? supplies.map((s) => <ListItemWithButton
//                 key={s.SupplyID}
//                 rowOneData={{label:'Supplier Name', text:s.SupplierName}}
//                 rowTwoData={{label:'Supply Description', text:s.SupplyType}}
//                 buttonLabel='View'
//                 fun={() => mountModal(s)}
//         />) : <DispText text='No supplies available'/>
//       }
//       <MyModal
//         visible = {showModal}
//         onClose={() => unmountModal()}
//         title='Add To Cart'
//       >
//         <BigForm>
//             <LabelledText
//               label='Supplier Name'
//               text = {String(selectedSupply?.SupplierName)}
//             />

//             <LabelledText
//               label='Supply Type'
//               text={String(selectedSupply?.SupplyType)}
//             />

//             <LabelledText
//               label='Supplier Contact'
//               text={String(selectedSupply?.PhoneNo)}
//             />

//             <LabelledText
//               label='Supply Price'
//               text={String(selectedSupply?.Price)}
//             />

//             <LabelledText
//               label='Units'
//               text={String(selectedSupply?.AvailableUnits)}
//             />

//             <FormStrip>
//               <Button
//                   label='Close'
//                   fun={()=> unmountModal()}
//               />

//               <Button
//                   label='Add'
//                   fun={()=> cart?.addItem({sele})}
//               />
//             </FormStrip>
//         </BigForm>
//       </MyModal>
//     </ScrollScreen>
//   )
// }

