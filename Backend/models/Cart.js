import { Schema, model } from 'mongoose';

const cartItemSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const CartItem = model('CartItem', cartItemSchema);

export default CartItem;