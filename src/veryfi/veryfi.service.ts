import { Injectable } from '@nestjs/common';

import { UploadDocumentDto } from './dtos/upload-document.dto';
import { validateData } from './utils/validateDocument';
import { UpdateDocumentDto } from './dtos/update-document.dto';

import { VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';
import { HttpClientBase } from '@shared/services/http-client-base/http-client-base.service';
import { EnvService } from '@shared/services/env/env.service';
import { handleHttpError } from '@shared/utils/http-error-handler';
import { ProcessDocumentDto } from './dtos/process-document.dto';

@Injectable()
export class VeryfiService {
  constructor(
    private readonly http: HttpClientBase,
    private readonly envService: EnvService,
  ) {}

  async processDocument(processDocumentDto: ProcessDocumentDto) {
    const { deviceData, document, campaign, uid } = processDocumentDto;

    try {
      const uploadDocumentResponse = await this.uploadDocument({ deviceData, document, campaign });

      const notesData = { notes: uid };
      await this.updateDocument({ documentId: uploadDocumentResponse.id, campaign, data: notesData });

      validateData(uploadDocumentResponse, campaign);

      // Subir factura a superlikers
      // Agregar tag de puntos
    } catch (err) {
      handleHttpError(err);
    }
  }

  async uploadDocument(uploadDocumentDto: UploadDocumentDto): Promise<VeryfiReceipt> {
    const { deviceData, document, campaign } = uploadDocumentDto;

    const config = this.envService.getConfig(campaign);
    const { VERYFI_USERNAME, VERYFI_CLIENT_ID, VERYFI_API_KEY } = config;

    const url = 'https://api.veryfi.com/api/v8/partner/documents';
    const headers = this.getVeryfiHeaders(VERYFI_CLIENT_ID, VERYFI_USERNAME, VERYFI_API_KEY);

    const body = {
      file_data: document,
      device_data: deviceData,
    };

    try {
      const response = await this.http.post<VeryfiReceipt>(url, body, headers);
      return response;
    } catch (err) {
      handleHttpError(err);
      throw new Error('Failed to upload document to Veryfi');
    }
  }

  async updateDocument(updateDocumentDto: UpdateDocumentDto): Promise<VeryfiReceipt> {
    const { documentId, campaign, data } = updateDocumentDto;

    const config = this.envService.getConfig(campaign);
    const { VERYFI_USERNAME, VERYFI_CLIENT_ID, VERYFI_API_KEY } = config;

    const url = `https://api.veryfi.com/api/v8/partner/documents/${documentId}`;
    const headers = this.getVeryfiHeaders(VERYFI_CLIENT_ID, VERYFI_USERNAME, VERYFI_API_KEY);

    try {
      const response = await this.http.put<VeryfiReceipt>(url, data, headers);
      return response;
    } catch (err) {
      handleHttpError(err);
      throw new Error('Failed to update document to Veryfi');
    }
  }

  private getVeryfiHeaders(clientId: string, username: string, apiKey: string) {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'CLIENT-ID': clientId,
      AUTHORIZATION: `apikey ${username}:${apiKey}`,
    };
  }
}
