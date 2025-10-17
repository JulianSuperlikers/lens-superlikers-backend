import { getMicrositeConfig } from '@core/constants/campaigns.constants';
import { MicrositeDetails } from '@core/interfaces/campaigns.interfaces';
import { VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';
import { ValidationError } from '@shared/utils/validation-error';

export const checkTagsErrors = (data: VeryfiReceipt, micrositeConfig: MicrositeDetails) => {
  const veryfiTagsNames = data.tags.map((item) => item.name);

  const { tags, validationMessages } = micrositeConfig;
  const tag = tags.find((t) => veryfiTagsNames.includes(t));

  if (tag) {
    const message = validationMessages[tag];
    throw new ValidationError(`${message} Ref: ${data.id}`);
  }
};

export const validateData = (data: VeryfiReceipt, campaign: string) => {
  const micrositeConfig = getMicrositeConfig(campaign);

  checkTagsErrors(data, micrositeConfig);
};
