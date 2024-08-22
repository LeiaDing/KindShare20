import { initializeProducts, getProducts, Product} from './data';

export function init(): void {
  initializeProducts();
}

export function getproducts(): Product[] {
  return getProducts();
}
