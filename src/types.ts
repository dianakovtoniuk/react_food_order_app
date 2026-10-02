export interface Meal {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface CartItem extends Meal {
  quantity: number;
}