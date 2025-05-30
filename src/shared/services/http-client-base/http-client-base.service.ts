import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClientBase {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, params: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<T> {
    const response = await firstValueFrom(this.httpService.get<T>(url, { params, headers }));
    return response.data;
  }

  async post<T>(url: string, data: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<T> {
    const response = await firstValueFrom(this.httpService.post<T>(url, data, { headers }));
    return response.data;
  }

  async patch<T>(url: string, data: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<T> {
    const response = await firstValueFrom(this.httpService.patch<T>(url, data, { headers }));
    return response.data;
  }

  async put<T>(url: string, data: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<T> {
    const response = await firstValueFrom(this.httpService.put<T>(url, data, { headers }));
    return response.data;
  }

  async delete<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
    const response = await firstValueFrom(this.httpService.delete<T>(url, { headers }));
    return response.data;
  }
}
