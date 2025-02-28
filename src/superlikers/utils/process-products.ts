import { getMicrositeConfig } from '@core/constants/campaigns.constants';
import { Product, SaleSummary } from '@core/interfaces/superlikers.interefaces';
import { VeryfiLineItem, VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';

/**
 * Extracts product details from a Veryfi document.
 * Returns a structured summary containing products, total price, and discount.
 */
export const extractProductsFromDocument = (document: VeryfiReceipt, campaign: string): SaleSummary => {
  const micrositeConfig = getMicrositeConfig(campaign);
  const { additionalProductsFields } = micrositeConfig;

  const productItems = document.line_items.filter((item) => item.tags.includes('PRODUCT_FOUND'));

  const products: Product[] = productItems.map((item) => {
    const { description, product_details, price, quantity, total } = item;

    const ref = product_details.at(0)?.product_name ?? description;
    const unitPrice = price ?? (quantity ? total / quantity : 0);

    const newProduct: Product = {
      ref,
      quantity,
      price: unitPrice,
      type: document.vendor.name,
    };

    return additionalProductsFields ? { ...newProduct, ...additionalProductsFields } : newProduct;
  });

  const { discount, total } = calculateDiscountAndTotal(productItems);

  return { products, total, discount };
};

export const calculateDiscountAndTotal = (productItems: VeryfiLineItem[]): { total: number; discount: number } => {
  const total = productItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const discount = productItems.reduce((sum, item) => {
    if (!item.discount) return sum;
    return sum + Math.abs(item.discount);
  }, 0);

  return { total, discount };
};
