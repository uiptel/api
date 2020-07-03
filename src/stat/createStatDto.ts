import { StatDto } from "./statDto";

export class CreateStatDto extends StatDto {
   ip: string;
   userAgent: string;
   referer: string;
}
