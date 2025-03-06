import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditService } from './credit.service';
import { Credit } from './credit.schema';

describe('CreditService', () => {
  let service: CreditService;
  let model: Model<Credit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditService,
        {
          provide: getModelToken(Credit.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockReturnThis(),  // Moquer la méthode find
            exec: jest.fn(),  // Ajouter exec ici pour éviter l'erreur
          },
        },
      ],
    }).compile();

    service = module.get<CreditService>(CreditService);
    model = module.get<Model<Credit>>(getModelToken(Credit.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a credit', async () => {
    const creditDto = {
      name: 'John Doe',
      email: 'john@example.com',
      requestedAmount: 10000,
      termMonths: 12,
      monthlyIncome: 3000,
    };

    const createdCredit: Credit = {
      _id: '123456789',
      name: 'John Doe',
      email: 'john@example.com',
      requestedAmount: 10000,
      termMonths: 12,
      monthlyIncome: 3000,
      requestDate: new Date(),
      status: 'pending',
    } as Credit;

    jest.spyOn(model, 'create').mockResolvedValue(createdCredit as any);

    const result = await service.create(creditDto);
    expect(result).toEqual(createdCredit);
    expect(model.create).toHaveBeenCalledWith(creditDto);
  });

  it('should return all credits', async () => {
    const credits: Credit[] = [
      {
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
  
    const findMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(credits), 
    });
  
    jest.spyOn(model, 'find').mockImplementation(findMock);
  
    const result = await service.findAll();
  
    expect(result).toEqual(credits);
    expect(findMock).toHaveBeenCalled();
    expect(findMock().exec).toHaveBeenCalled();
  });
  
});

