import { Test, TestingModule } from '@nestjs/testing';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { Credit } from './credit.schema';

describe('CreditController', () => {
  let controller: CreditController;
  let service: CreditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditController],
      providers: [
        {
          provide: CreditService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            generateMockOffers: jest.fn(), 
          },
        },
      ],
    }).compile();

    controller = module.get<CreditController>(CreditController);
    service = module.get<CreditService>(CreditService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new credit', async () => {
    const creditDto = {
      userId: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      requestedAmount: 10000,
      termMonths: 12,
      monthlyIncome: 3000,
    };

    const createdCredit: Credit = {
      userId: 'user-123',
      _id: '123456789',
      name: 'John Doe',
      email: 'john@example.com',
      requestedAmount: 10000,
      termMonths: 12,
      monthlyIncome: 3000,
      requestDate: new Date(),
      status: 'pending',
    } as Credit; 

    jest.spyOn(service, 'create').mockResolvedValue(createdCredit);

    const result = await controller.create(creditDto);
    expect(result).toEqual(createdCredit);
    expect(service.create).toHaveBeenCalledWith(creditDto);
  });

  it('should return all credits', async () => {
    const credits: Credit[] = [
      {
        userId: 'user-123',
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        requestedAmount: 10000,
        termMonths: 12,
        monthlyIncome: 3000,
        requestDate: new Date(),
        status: 'pending',
      } as Credit,
      {
        userId: 'user-123',
        _id: '2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        requestedAmount: 15000,
        termMonths: 24,
        monthlyIncome: 4000,
        requestDate: new Date(),
        status: 'approved',
      } as Credit,
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(credits);

    const result = await controller.findAll();
    expect(result).toEqual(credits);
  });

  it('should return mock credit offers', async () => {
    const mockOffers = [
      {
        id:1,
        bankName: 'Fantasia Bank 1',
        approvedAmount: 4000,
        periodMonths: 24,
        interestRate: 10,
        monthlyCost: 188.51,
        offerUrl: 'https://www.fantasiabank1.com/offer',
      },
      {
        id:2,
        bankName: 'Fantasia Bank 2',
        approvedAmount: 5000,
        periodMonths: 36,
        interestRate: 8,
        monthlyCost: 151.68,
        offerUrl: 'https://www.fantasiabank2.com/offer',
      },
      {
        id:3,
        bankName: 'Fantasia Bank 3',
        approvedAmount: 3500,
        periodMonths: 18,
        interestRate: 12,
        monthlyCost: 267.75,
        offerUrl: 'https://www.fantasiabank3.com/offer',
      },
    ];

    jest.spyOn(service, 'generateMockOffers').mockReturnValue(mockOffers);

    const result = await controller.getMockOffers();
    expect(result).toEqual(mockOffers);
    expect(service.generateMockOffers).toHaveBeenCalled();
  });
});
