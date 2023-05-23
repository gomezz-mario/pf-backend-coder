import { persistence } from "../config.js";

export let Product;
export let User;
export let Cart;

switch (persistence) {
    case 'MONGO':
        const { default: ProductMongo } = await import('./mongo/products.mongo.js')
        Product = ProductMongo;
        const { default: UserMongo } = await import('./mongo/users.mongo.js');
        User = UserMongo;
        const { default: CartMongo } = await import('./mongo/carts.mongo.js');
        Cart = CartMongo;
        break;
    case 'FILE':
        const { default: ProductFile } = await import('./file/products.file.js')
        Product = ProductFile;
        const { default: UserFile } = await import('./file/users.file.js')
        User = UserFile;
        const { default: CartFile } = await import('./file/carts.file.js')
        Cart = CartFile;
        break;
    default:
        const { default: ProductMemory } = await import('./memory/products.memory.js')
        Product = ProductMemory;
        const { default: UserMemory } = await import('./memory/users.memory.js')
        User = UserMemory;
        const { default: CartMemory } = await import('./memory/carts.memory.js')
        Cart = CartMemory;
        break;
}   