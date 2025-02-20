import { BadRequestException, Injectable } from '@nestjs/common';

import { GetParticipantDto } from './dtos/get-participant.dto';
import { HttpClientBase } from '@shared/services/http-client-base/http-client-base.service';
import { EnvService } from '@shared/services/env/env.service';
import { GetParticipantResponse } from '@core/interfaces/superlikers.interefaces';

@Injectable()
export class SuperlikersService {
  constructor(
    private readonly httpClientBase: HttpClientBase,
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
      const response = await this.httpClientBase.get<GetParticipantResponse>(url, params, headers);
      return { ok: true, participant: response.object };
    } catch (error: unknown) {
      console.log(error);
      throw new BadRequestException('An unexpected error occurred');
    }
  }
}
