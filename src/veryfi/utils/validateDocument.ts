import { getMicrositeConfig } from '@core/constants/campaigns.constants';
import { MicrositeDetails } from '@core/interfaces/campaigns.interfaces';
import { VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';
import { ValidationError } from '@shared/utils/validation-error';

export const checkTagsErrors = (data: VeryfiReceipt, micrositeConfig: MicrositeDetails) => {
  const { tags, validationMessages } = micrositeConfig;
  const tag = data.tags.find((item) => tags.includes(item.name));

  if (tag) {
    const message = validationMessages[tag.name];
    throw new ValidationError(`${message} Ref: ${data.id}`);
  }
};

export const validateData = (data: VeryfiReceipt, campaign: string) => {
  const micrositeConfig = getMicrositeConfig(campaign);

  const validItems = data.line_items.filter((item) => item.tags.includes('PRODUCT_FOUND'));

  const message = micrositeConfig.validationMessages.NO_PRODUCT_FOUND;
  if (validItems.length === 0) throw new ValidationError(`${message} Ref ${data.id}`);

  checkTagsErrors(data, micrositeConfig);
};
