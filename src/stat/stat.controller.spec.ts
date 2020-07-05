import { Test, TestingModule } from '@nestjs/testing';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';

describe('StatController', () => {
  let statController: StatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatController],
      providers: [StatService],
    }).compile();

    statController = app.get<StatController>(StatController);
  });
});
