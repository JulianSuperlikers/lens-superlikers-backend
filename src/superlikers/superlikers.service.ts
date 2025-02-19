import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { GetParticipantDto } from './dtos/get-participant.dto';
import { HttpClientBase } from '@shared/services/http-client-base/http-client-base.service';
import { EnvService } from '@shared/services/env/env.service';

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

    console.log(config);
    const url = `${SUPERLIKERS_URL}/participants/info`;

    const params = {
      campaign: SUPERLIKERS_CAMPAIGN_ID,
      distinct_id: uid,
    };

    const headers = {
      Authorization: `Bearer ${SUPERLIKERS_API_KEY}`,
    };

    try {
      const response = await this.httpClientBase.get(url, params, headers);
      return response;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('error');
    }
  }
}
