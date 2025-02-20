import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '@core/interfaces/config.interfaces';
import { getMicrositeConfig } from '@core/constants/campaigns.constants';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  getConfig(campaignId: string): Config {
    const campaignConfig = getMicrositeConfig(campaignId);
    const campaign = campaignConfig.name;

    const config = {
      SUPERLIKERS_URL: this.getEnvVariable('SUPERLIKERS_URL'),
      VERYFI_VALIDATE_URL: this.getEnvVariable('VERYFI_VALIDATE_URL'),
      VERYFI_BASE_URL: this.getEnvVariable('VERYFI_BASE_URL'),
      SUPERLIKERS_CAMPAIGN_ID: this.getEnvVariable(`${campaign}_CAMPAIGN_ID`),
      SUPERLIKERS_API_KEY: this.getEnvVariable(`${campaign}_API_KEY`),
      VERYFI_CLIENT_ID: this.getEnvVariable(`${campaign}_VERYFI_CLIENT_ID`),
      VERYFI_CLIENT_SECRET: this.getEnvVariable(`${campaign}_VERYFI_CLIENT_SECRET`),
      VERYFI_API_KEY: this.getEnvVariable(`${campaign}_VERYFI_API_KEY`),
      VERYFI_USERNAME: this.getEnvVariable(`${campaign}_VERYFI_USERNAME`),
    };

    return config;
  }

  private getEnvVariable(key: string): string {
    return this.configService.get<string>(key)!;
  }
}
