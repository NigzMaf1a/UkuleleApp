enum CartStatus {
    OPEN = "open",
    CHECKED_OUT = "checked_out",
    ABANDONED = "abandoned",
}

export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
}

export default class Cart{
    private readonly cartId: number;
    private status: CartStatus = CartStatus.OPEN;

    private items: Map<number, CartItem> = new Map();
    private productIds: Set<number> = new Set();

    constructor(cartId: number) {
        this.cartId = cartId;
    }

    public addItem = (item: CartItem): void => {
        if (this.status !== CartStatus.OPEN) return;

        if (this.productIds.has(item.productId)) {
            const existing = this.items.get(item.productId)!;
            existing.quantity += item.quantity;
            this.items.set(item.productId, existing);
        } else {
            this.productIds.add(item.productId);
            this.items.set(item.productId, item);
        }
    };

    public removeItem(productId: number): void {
        if (!this.items.has(productId)) return;
        this.items.delete(productId);
        this.productIds.delete(productId);
    }

    public updateQuantity(productId: number, qty: number): void {
        if (qty <= 0 || !this.items.has(productId)) return;
        const item = this.items.get(productId)!;
        item.quantity = qty;
        this.items.set(productId, item);
    }

    public getItems(): CartItem[] {
        return Array.from(this.items.values());
    }

    public getStatus(): CartStatus {
        return this.status;
    }

    public checkout(): void {
        if (this.items.size === 0) return;
        this.status = CartStatus.CHECKED_OUT;
    }
}