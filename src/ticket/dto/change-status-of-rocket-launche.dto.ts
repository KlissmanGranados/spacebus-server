import { SelectById } from "@shared/dto/select-by-id.dto";
import { IsBoolean } from "class-validator";

export class changeStatusOfRocketLauncheDto extends SelectById {
    @IsBoolean()
    status: boolean;
}