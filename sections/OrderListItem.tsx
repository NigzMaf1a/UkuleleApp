import React, { useState } from 'react';
import { View } from 'react-native';

//components
import LabelledText from '../components/LabelledText';
import Button from '../components/Button';
import Strip from '../components/Strip';
import MyModal from '../components/MyModal';

//styles
import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { scale } from "../styles/responsive";
import { typography } from "../styles/typography";

const cardStyles = StyleSheet.create({
  // Main horizontal container: tray + button
  strip: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.sm,
    borderRadius: scale(12),
    backgroundColor: colors.surface,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: scale(6),
    elevation: 3,
    marginBottom: spacing.md
  },

  // Left-side vertical stack
  tray: {
    width: "75%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: spacing.xs
  },

  // Horizontal row for label + value
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  // Optional: style for text inside row (if you want to override DispText)
  rowLabel: {
    ...typography.body,
    color: colors.text
  },

  rowValue: {
    ...typography.body,
    color: colors.textSecondary
  }
});

//interfaces
import Order from '../scripts/interfaces/orders';
import Supply from '../scripts/interfaces/supply';

//enums
import { EquipmentDescription } from '../scripts/enums/equipment';
import { OrderStatus } from '../scripts/enums/order';

interface OrderListItemProps {
  order: Order;
  supplies: Supply[];
  fun: (par?: string | number) => Promise<void> | void;
}

export default function OrderListItem({ order, supplies, fun }: OrderListItemProps) {
  const [description] = useState<EquipmentDescription>(getDescription());
  const [showModal, setShowModal] = useState<boolean>(false);

  function getDescription(): EquipmentDescription {
    return supplies.find(supply => supply.SupplyID === order.OrderID)?.SupplyType as EquipmentDescription;
  }

  function toggleModal() {
    setShowModal(prev => !prev);
  }

  return (
    <>
      <View style={cardStyles.strip}>
        <View style={cardStyles.tray}>
          <LabelledText label={'ID'} text={String(order.OrderID)} />
          <LabelledText label={'Date'} text={String(order.OrderDate)} />
        </View>
        <Button label={order.OrderStatus.toLowerCase()} fun={() => toggleModal()} />
      </View>

      <MyModal
        visible={showModal}
        onClose={toggleModal}
        title="Order Details"
        footer={
          <Strip>
            <Button label={'Close'} fun={() => toggleModal()} />
            <Button
              label={
                order.OrderStatus === OrderStatus.Processing
                  ? 'Haul'
                  : order.OrderStatus === OrderStatus.Hauled
                    ? 'Delivered'
                    : 'Cancel'
              }
              fun={fun}
              variant='secondary'
            />
          </Strip>
        }
      >
        <LabelledText label='Order ID:' text={String(order.OrderID)} />
        <LabelledText label='Supply ID:' text={String(order.SupplyID)} />
        <LabelledText label='Order Date:' text={String(order.OrderDate)} />
        <LabelledText label='Description:' text={description} />
        <LabelledText label='Order Amount:' text={String(order.OrderAmount)} />
        <LabelledText label='Order Status:' text={order.OrderStatus} />
      </MyModal>
    </>
  );
}