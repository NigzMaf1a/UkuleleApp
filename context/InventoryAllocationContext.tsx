import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    type ReactNode
} from 'react'

import type Inventory from '../scripts/interfaces/inventory'
import Storeman from '../scripts/classes/storeman'
import storage from '../scripts/auth/storage'

interface AllocationState {
    inventory: Inventory[]
    selected: Inventory[]
    loading: boolean
    submitting: boolean
    error: unknown
}

type AllocationAction =
    | { type: 'LOAD_START' }
    | { type: 'LOAD_SUCCESS'; payload: Inventory[] }
    | { type: 'LOAD_ERROR'; payload: unknown }
    | { type: 'ADD_ITEM'; payload: Inventory }
    | { type: 'REMOVE_ITEM'; payload: Inventory }
    | { type: 'CLEAR_SELECTION' }
    | { type: 'SUBMIT_START' }
    | { type: 'SUBMIT_END' }

interface InventoryAllocationContextValue extends AllocationState {
    addItem: (item: Inventory) => void
    removeItem: (item: Inventory) => void
    clearSelection: () => void
    reloadInventory: () => Promise<void>
    setSubmitting: (submitting: boolean) => void
}

const initialState: AllocationState = {
    inventory: [],
    selected: [],
    loading: true,
    submitting: false,
    error: null
}

function getItemKey(item: Inventory): string {
    // Replace this with your actual stable inventory primary key.
    return JSON.stringify(item)
}

function reducer(
    state: AllocationState,
    action: AllocationAction
): AllocationState {
    switch (action.type) {
        case 'LOAD_START':
            return {
                ...state,
                loading: true,
                error: null
            }

        case 'LOAD_SUCCESS':
            return {
                ...state,
                inventory: action.payload,
                loading: false,
                error: null
            }

        case 'LOAD_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case 'ADD_ITEM': {
            const key = getItemKey(action.payload)

            if (
                state.selected.some(
                    item => getItemKey(item) === key
                )
            ) {
                return state
            }

            return {
                ...state,
                selected: [...state.selected, action.payload]
            }
        }

        case 'REMOVE_ITEM': {
            const key = getItemKey(action.payload)

            return {
                ...state,
                selected: state.selected.filter(
                    item => getItemKey(item) !== key
                )
            }
        }

        case 'CLEAR_SELECTION':
            return {
                ...state,
                selected: []
            }

        case 'SUBMIT_START':
            return {
                ...state,
                submitting: true,
                error: null
            }

        case 'SUBMIT_END':
            return {
                ...state,
                submitting: false
            }

        default:
            return state
    }
}

const InventoryAllocationContext =
    createContext<InventoryAllocationContextValue | null>(null)

interface InventoryAllocationProviderProps {
    children: ReactNode
}

export function InventoryAllocationProvider({
    children
}: InventoryAllocationProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const requestId = useRef(0)
    const mounted = useRef(false)

    const reloadInventory = useCallback(async () => {
        const currentRequest = ++requestId.current

        dispatch({ type: 'LOAD_START' })

        try {
            const [key, profile] = await Promise.all([
                storage.get.key(),
                storage.get.profile()
            ])

            if (
                typeof key === 'undefined' ||
                !key ||
                typeof profile?.RegID === 'undefined'
            ) {
                throw new Error('Authentication credentials are unavailable')
            }

            const storeman = new Storeman(
                Number(profile.RegID),
                String(key)
            )

            const inventory = await storeman.getEquipment()

            if (!Array.isArray(inventory)) {
                throw new Error('The inventory response is invalid')
            }

            if (
                mounted.current &&
                currentRequest === requestId.current
            ) {
                dispatch({
                    type: 'LOAD_SUCCESS',
                    payload: inventory
                })
            }
        } catch (error: unknown) {
            if (
                mounted.current &&
                currentRequest === requestId.current
            ) {
                dispatch({
                    type: 'LOAD_ERROR',
                    payload: error
                })
            }
        }
    }, [])

    useEffect(() => {
        mounted.current = true
        void reloadInventory()

        return () => {
            mounted.current = false
            requestId.current++
        }
    }, [reloadInventory])

    const addItem = useCallback((item: Inventory) => {
        dispatch({ type: 'ADD_ITEM', payload: item })
    }, [])

    const removeItem = useCallback((item: Inventory) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item })
    }, [])

    const clearSelection = useCallback(() => {
        dispatch({ type: 'CLEAR_SELECTION' })
    }, [])

    const setSubmitting = useCallback((submitting: boolean) => {
        dispatch({
            type: submitting ? 'SUBMIT_START' : 'SUBMIT_END'
        })
    }, [])

    const value = useMemo<InventoryAllocationContextValue>(
        () => ({
            ...state,
            addItem,
            removeItem,
            clearSelection,
            reloadInventory,
            setSubmitting
        }),
        [
            state,
            addItem,
            removeItem,
            clearSelection,
            reloadInventory,
            setSubmitting
        ]
    )

    return (
        <InventoryAllocationContext.Provider value={value}>
            {children}
        </InventoryAllocationContext.Provider>
    )
}

export function useInventoryAllocationContext() {
    const context = useContext(InventoryAllocationContext)

    if (!context) {
        throw new Error(
            'useInventoryAllocationContext must be used within InventoryAllocationProvider'
        )
    }

    return context
}