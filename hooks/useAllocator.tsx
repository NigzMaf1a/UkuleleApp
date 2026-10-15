import { useInventoryAllocationContext } from '../context/InventoryAllocationContext'

export default function useAllocator() {
    const {
        inventory,
        selected,
        loading,
        submitting,
        error,
        addItem,
        removeItem,
        clearSelection,
        reloadInventory,
        setSubmitting
    } = useInventoryAllocationContext()

    return {
        inventory,
        selected,
        loading,
        submitting,
        error,
        addItem,
        removeItem,
        clearSelection,
        reloadInventory,
        setSubmitting
    }
}