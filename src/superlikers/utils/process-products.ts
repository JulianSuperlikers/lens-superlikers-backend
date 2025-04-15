import { getMicrositeConfig } from '@core/constants/campaigns.constants';
import { Product } from '@core/interfaces/superlikers.interfaces';
import { VeryfiProduct, VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';
import { RegisterSaleDto } from '@superlikers/dtos/register-sale.dto';

export const getSaleBody = (uid: string, document: VeryfiReceipt, campaign: string) => {
  const micrositeConfig = getMicrositeConfig(campaign);

  const ref = String(document.id);
  const products = extractProductsFromDocument(document, campaign);
  const discount = calculateDiscount(document.line_items);
  const category = micrositeConfig.category;
  const properties = micrositeConfig.properties?.(document);

  const sale = { ref, uid, campaign, products, discount };
  if (properties) sale['properties'] = properties;
  if (category) sale['category'] = category;

  return sale as RegisterSaleDto;
};

/**
 * Extracts product details from a Veryfi document.
 */
export const extractProductsFromDocument = (document: VeryfiReceipt, campaign: string): Product[] => {
  const micrositeConfig = getMicrositeConfig(campaign);
  const { additionalProductsFields } = micrositeConfig;

  // const productItems = document.line_items.filter((item) => item.tags.includes('PRODUCT_FOUND') && item.total > 0);
  const productItems = document.line_items;

  const products: Product[] = productItems.map((item) => {
    const { description, product_details, quantity, total } = item;

    const ref = product_details.at(0)?.product_name ?? description;
    const unitPrice = quantity !== 0 ? total / Math.abs(quantity) : 0;

    const newProduct: Product = {
      ref,
      quantity: quantity,
      price: unitPrice,
      type: document.vendor.name,
    };

    return additionalProductsFields ? { ...newProduct, ...additionalProductsFields } : newProduct;
  });

  return products;
};

export const calculateDiscount = (items: VeryfiProduct[]): number => {
  const productsItems = items.filter((item) => item.tags.includes('PRODUCT_FOUND') && item.total > 0);
  const discountItems = items.filter((item) => item.tags.includes('PRODUCT_FOUND') && item.total <= 0);

  // Calculate discounts applied directly to each product
  const productsItemsDiscount = productsItems.reduce((sum, item) => {
    if (!item.discount) return sum;
    return sum + Math.abs(item.discount);
  }, 0);

  // Calculate discounts that appear as separate line items (negative totals)
  const discountItemsDiscount = discountItems.reduce((sum, item) => {
    return sum + Math.abs(item.total);
  }, 0);

  const totalDiscount = productsItemsDiscount + discountItemsDiscount;

  return totalDiscount;
};
