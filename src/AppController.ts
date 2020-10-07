import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface IndexModel {
    version: string;
    commitId: string;
    buildDate: string;
    digestImage: string;
    nodeEnv: string;
}

@Controller('')
export class AppController {
    constructor(private readonly configService: ConfigService) { }
    
    @Get('')
    index(): IndexModel {
        return {
            version: this.configService.get('version'),
            commitId: this.configService.get('commitId'),
            buildDate: this.configService.get('buildDate'),
            digestImage: this.configService.get('digestImage'),
            nodeEnv: this.configService.get('nodeEnv'),
        };
    }
}
