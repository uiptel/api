import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface IndexModel {
    version: string;
    vcsRef: string;
    buildDate: string;
    nodeEnv: string;
}

@Controller('')
export class AppController {
    constructor(private readonly configService: ConfigService) { }
    
    @Get('')
    index(): IndexModel {
        return {
            version: this.configService.get('version'),
            vcsRef: this.configService.get('vcsRef'),
            buildDate: this.configService.get('buildDate'),
            nodeEnv: this.configService.get('nodeEnv'),
        };
    }
}
