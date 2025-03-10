import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientBase } from './http-client-base.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { of, throwError } from 'rxjs';

describe('HttpClientBase', () => {
  let service: HttpClientBase;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpClientBase,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HttpClientBase>(HttpClientBase);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get method', () => {
    const testUrl: string = 'https://api.example.com/data';
    const testParams: Record<string, any> = { page: 1 };
    const testHeaders: Record<string, string> = { Authorization: 'Bearer token' };

    it('should perform a GET request and return data', async () => {
      const mockResponse: AxiosResponse<{ success: boolean }> = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

      const result = await service.get<{ success: boolean }>(testUrl, testParams, testHeaders);

      expect(httpService['get']).toHaveBeenCalledWith(testUrl, { params: testParams, headers: testHeaders });
      expect(result).toEqual({ success: true });
    });

    it('should perform a GET request with default params and headers when none are provided', async () => {
      const mockResponse: AxiosResponse<{ message: string }> = {
        data: { message: 'default' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

      const result = await service.get<{ message: string }>(testUrl);

      expect(httpService['get']).toHaveBeenCalledWith(testUrl, { params: {}, headers: {} });
      expect(result).toEqual({ message: 'default' });
    });

    it('should propagate errors when HttpService.get fails', async () => {
      const errorMessage = 'Network Error';
      jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => new Error(errorMessage)));

      await expect(service.get(testUrl, testParams, testHeaders)).rejects.toThrow(errorMessage);
    });
  });

  describe('post method', () => {
    const testUrl: string = 'https://api.example.com/data';
    const testData: Record<string, any> = { page: 1, name: 'mock name' };
    const testHeaders: Record<string, string> = { Authorization: 'Bearer token' };

    it('should perform a POST request and return data', async () => {
      const mockResponse: AxiosResponse<{ success: true }> = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

      const result = await service.post<{ success: true }>(testUrl, testData, testHeaders);

      expect(httpService['post']).toHaveBeenCalledWith(testUrl, testData, { headers: testHeaders });
      expect(result).toEqual({ success: true });
    });

    it('should perform a POST request with default data and headers when none are provided', async () => {
      const mockResponse: AxiosResponse<{ message: string }> = {
        data: { message: 'default' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

      const result = await service.post<{ message: string }>(testUrl);

      expect(httpService['post']).toHaveBeenCalledWith(testUrl, {}, { headers: {} });
      expect(result).toEqual({ message: 'default' });
    });

    it('should propagate errors when HttpService.post fails', async () => {
      const errorMessage = 'Network Error';
      jest.spyOn(httpService, 'post').mockReturnValue(throwError(() => new Error(errorMessage)));

      await expect(service.post(testUrl, testData, testHeaders)).rejects.toThrow(errorMessage);
    });
  });

  describe('patch method', () => {
    const testUrl: string = 'https://api.example.com/data';
    const testData: Record<string, any> = { id: 1, name: 'patch name' };
    const testHeaders: Record<string, string> = { Authorization: 'Bearer token' };

    it('should perform a PATCH request and return data', async () => {
      const mockResponse: AxiosResponse<{ success: true }> = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'patch').mockReturnValue(of(mockResponse));

      const result = await service.patch<{ success: true }>(testUrl, testData, testHeaders);

      expect(httpService['patch']).toHaveBeenCalledWith(testUrl, testData, { headers: testHeaders });
      expect(result).toEqual({ success: true });
    });

    it('should perform a PATCH request with default data and headers when none are provided', async () => {
      const mockResponse: AxiosResponse<{ message: string }> = {
        data: { message: 'default' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'patch').mockReturnValue(of(mockResponse));

      const result = await service.patch<{ message: string }>(testUrl);

      expect(httpService['patch']).toHaveBeenCalledWith(testUrl, {}, { headers: {} });
      expect(result).toEqual({ message: 'default' });
    });

    it('should propagate errors when HttpService.patch fails', async () => {
      const errorMessage = 'Network Error';
      jest.spyOn(httpService, 'patch').mockReturnValue(throwError(() => new Error(errorMessage)));

      await expect(service.patch(testUrl, testData, testHeaders)).rejects.toThrow(errorMessage);
    });
  });

  describe('put method', () => {
    const testUrl: string = 'https://api.example.com/data';
    const testData: Record<string, any> = { id: 1, name: 'put name' };
    const testHeaders: Record<string, string> = { Authorization: 'Bearer token' };

    it('should perform a PUT request and return data', async () => {
      const mockResponse: AxiosResponse<{ success: true }> = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'put').mockReturnValue(of(mockResponse));

      const result = await service.put<{ success: true }>(testUrl, testData, testHeaders);

      expect(httpService['put']).toHaveBeenCalledWith(testUrl, testData, { headers: testHeaders });
      expect(result).toEqual({ success: true });
    });

    it('should perform a PUT request with default data and headers when none are provided', async () => {
      const mockResponse: AxiosResponse<{ message: string }> = {
        data: { message: 'default' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'put').mockReturnValue(of(mockResponse));

      const result = await service.put<{ message: string }>(testUrl);

      expect(httpService['put']).toHaveBeenCalledWith(testUrl, {}, { headers: {} });
      expect(result).toEqual({ message: 'default' });
    });

    it('should propagate errors when HttpService.put fails', async () => {
      const errorMessage = 'Network Error';
      jest.spyOn(httpService, 'put').mockReturnValue(throwError(() => new Error(errorMessage)));

      await expect(service.put(testUrl, testData, testHeaders)).rejects.toThrow(errorMessage);
    });
  });

  describe('delete method', () => {
    const testUrl: string = 'https://api.example.com/data';
    const testHeaders: Record<string, string> = { Authorization: 'Bearer token' };

    it('should perform a DELETE request and return data', async () => {
      const mockResponse: AxiosResponse<{ success: true }> = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'delete').mockReturnValue(of(mockResponse));

      const result = await service.delete<{ success: true }>(testUrl, testHeaders);

      expect(httpService['delete']).toHaveBeenCalledWith(testUrl, { headers: testHeaders });
      expect(result).toEqual({ success: true });
    });

    it('should perform a DELETE request with default headers when none are provided', async () => {
      const mockResponse: AxiosResponse<{ message: string }> = {
        data: { message: 'default' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      jest.spyOn(httpService, 'delete').mockReturnValue(of(mockResponse));

      const result = await service.delete<{ message: string }>(testUrl);

      expect(httpService['delete']).toHaveBeenCalledWith(testUrl, { headers: {} });
      expect(result).toEqual({ message: 'default' });
    });

    it('should propagate errors when HttpService.delete fails', async () => {
      const errorMessage = 'Network Error';
      jest.spyOn(httpService, 'delete').mockReturnValue(throwError(() => new Error(errorMessage)));

      await expect(service.delete(testUrl, testHeaders)).rejects.toThrow(errorMessage);
    });
  });
});
