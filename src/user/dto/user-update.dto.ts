import { IsNumber, IsString } from "class-validator";

export class UserUpdateDTO {
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
}
