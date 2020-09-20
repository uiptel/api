import { Test, TestingModule } from '@nestjs/testing';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('StatController', () => {
  let statController: StatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatController],
      providers: [StatService],
      imports: [TypeOrmModule],
    }).compile();

    statController = app.get<StatController>(StatController);
  });

  it('should be defined', () => {
    expect(statController).toBeDefined();
  });
});
