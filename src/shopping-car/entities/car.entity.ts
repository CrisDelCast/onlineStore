export class CartItem {
    productId: string;
    quantity: number;
  }
  
  export class Cart {
    userId: string;
    items: CartItem[];
    totalPrice: number;
  
    constructor(userId: string) {
      this.userId = userId;
      this.items = [];
      this.totalPrice = 0;
    }
  }
  