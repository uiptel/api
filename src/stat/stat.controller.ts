import { Controller, UseInterceptors, UseGuards} from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";
import { StatService } from './stat.service';
import { Stat } from './stat.entity';
import { StatInterceptor } from './stat.interceptor';
import { JwtAuthGuard } from 'src/auth/auth.service';

@Crud({
  model: {
    type: Stat,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
  routes: {
    only: ["getOneBase", "getManyBase", "createOneBase"],
  },
  query: {
    limit: 10,
    maxLimit: 30,
    alwaysPaginate: true
  }
})
@UseGuards(JwtAuthGuard)
@Controller('stat')
export class StatController implements CrudController<Stat> {
  constructor(public readonly service: StatService) { }

  get base(): CrudController<Stat> {
    return this;
  }

  @UseInterceptors(StatInterceptor)
  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Stat): Promise<Stat> {
    return this.base.createOneBase(req, dto);
  }
}
