import { Test, TestingModule } from '@nestjs/testing';
import { SuperlikersController } from './superlikers.controller';
import { SuperlikersService } from './superlikers.service';
import { GetParticipantDto } from './dtos/get-participant.dto';
import { RegisterSaleDto } from './dtos/register-sale.dto';
import { ProductDto } from './dtos/product.dto';

describe('SuperlikersController', () => {
  let controller: SuperlikersController;
  let service: SuperlikersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperlikersController],
      providers: [
        {
          provide: SuperlikersService,
          useValue: {
            getParticipant: jest.fn().mockReturnValue({
              ok: 'success',
              object: {
                uid: '12345',
              },
            }),
            sendExternal: jest.fn(),
            registerSale: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperlikersController>(SuperlikersController);
    service = module.get<SuperlikersService>(SuperlikersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getParticipant', () => {
    const getParticipantDto: GetParticipantDto = { campaign: 'mock-campaign', uid: '12345' };

    it('should call getParticipant from superlikers service', () => {
      const result = controller.getParticipant(getParticipantDto);

      expect(service['getParticipant']).toHaveBeenCalledTimes(1);
      expect(service['getParticipant']).toHaveBeenCalledWith(getParticipantDto);

      expect(result).toEqual({
        ok: 'success',
        object: {
          uid: '12345',
        },
      });
    });

    it('should propagate errors from service.getParticipant', () => {
      const errorMessage = 'Upload failed';
      (service.getParticipant as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => controller.getParticipant(getParticipantDto)).toThrow(errorMessage);
    });
  });

  describe('registerSale', () => {
    const mockProducts: ProductDto[] = [
      {
        ref: 'PRD002',
        price: 15.75,
        quantity: 30,
        provider: 'Provider B',
      },
      {
        ref: 'PRD003',
        price: 40.0,
        quantity: 20,
        provider: 'Provider C',
        type: 'electronics',
        line: 'accessories',
      },
    ];

    const registerSaleDto: RegisterSaleDto = {
      campaign: 'mock-campaign',
      uid: '12345',
      ref: '123',
      products: mockProducts,
    };

    it('should call getParticipant from superlikers service', () => {
      const registerSaleResponseMock = { ok: true, invoice: { ref: '123', total: 400 } };
      (service.registerSale as jest.Mock).mockReturnValue(registerSaleResponseMock);

      const result = controller.registerSale(registerSaleDto);

      expect(service['registerSale']).toHaveBeenCalledTimes(1);
      expect(service['registerSale']).toHaveBeenCalledWith(registerSaleDto);

      expect(result).toEqual(registerSaleResponseMock);
    });

    it('should propagate errors from service.registerSale', () => {
      const errorMessage = 'Upload failed';
      (service.registerSale as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      expect(() => controller.registerSale(registerSaleDto)).toThrow(errorMessage);
    });
  });
});
