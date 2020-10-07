import { Controller, UseInterceptors, UseGuards} from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from "@nestjsx/crud";
import { StatService } from './stat.service';
import { Stat } from './stat.entity';
import { StatInterceptor } from './stat.interceptor';
import { JwtAuthGuard } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

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
        getOneBase: { decorators: [UseGuards(JwtAuthGuard)]},
        getManyBase: { decorators: [UseGuards(JwtAuthGuard)]},
    },
    query: {
        limit: 10,
        maxLimit: 30,
        alwaysPaginate: true
    }
})
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
