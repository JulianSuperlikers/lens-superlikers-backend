import { Injectable } from '@nestjs/common';

import { GetParticipantDto } from './dtos/get-participant.dto';
import { RegisterSaleDto } from './dtos/register-sale.dto';
import { SendExternalDto } from './dtos/send-external.dto';

import { GetParticipantResponse, SaleResponse } from '@core/interfaces/superlikers.interfaces';
import { HttpClientBase } from '@shared/services/http-client-base/http-client-base.service';
import { EnvService } from '@shared/services/env/env.service';
import { handleHttpError } from '@shared/utils/http-error-handler';

@Injectable()
export class SuperlikersService {
  constructor(
    private readonly http: HttpClientBase,
    private readonly envService: EnvService,
  ) {}

  async getParticipant(getParticipantDto: GetParticipantDto) {
    const { campaign, uid } = getParticipantDto;

    const config = this.envService.getConfig(campaign);
    const { SUPERLIKERS_URL, SUPERLIKERS_CAMPAIGN_ID, SUPERLIKERS_API_KEY } = config;

    const url = `${SUPERLIKERS_URL}/participants/info`;

    const params = {
      campaign: SUPERLIKERS_CAMPAIGN_ID,
      distinct_id: uid,
    };

    const headers = {
      Authorization: `Bearer ${SUPERLIKERS_API_KEY}`,
    };

    try {
      const response = await this.http.get<GetParticipantResponse>(url, params, headers);
      return response.object;
    } catch (err: unknown) {
      handleHttpError(err);
    }
  }

  async sendExternal(sendExternalDto: SendExternalDto) {
    const { campaign, uid, properties, event } = sendExternalDto;

    const config = this.envService.getConfig(campaign);
    const { SUPERLIKERS_URL, SUPERLIKERS_CAMPAIGN_ID, SUPERLIKERS_API_KEY } = config;

    const url = `${SUPERLIKERS_URL}/events`;

    const body = {
      event,
      api_key: SUPERLIKERS_API_KEY,
      campaign: SUPERLIKERS_CAMPAIGN_ID,
      distinct_id: uid,
      properties,
    };

    try {
      const response = await this.http.post(url, body);
      return response;
    } catch (err: unknown) {
      handleHttpError(err);
    }
  }

  async registerSale(registerSaleDto: RegisterSaleDto) {
    const { campaign, uid, ref, products, date, properties, discount, category } = registerSaleDto;

    const config = this.envService.getConfig(campaign);
    const { SUPERLIKERS_URL, SUPERLIKERS_CAMPAIGN_ID, SUPERLIKERS_API_KEY } = config;

    const url = `${SUPERLIKERS_URL}/retail/buy`;

    const body = { api_key: SUPERLIKERS_API_KEY, campaign: SUPERLIKERS_CAMPAIGN_ID, distinct_id: uid, ref, products };
    if (date) body['date'] = date;
    if (properties) body['properties'] = properties;
    if (discount) body['discount'] = discount;
    if (category) body['category'] = category;

    try {
      const response = await this.http.post<SaleResponse>(url, body);
      return response.invoice;
    } catch (err: unknown) {
      handleHttpError(err);
    }
  }
}
