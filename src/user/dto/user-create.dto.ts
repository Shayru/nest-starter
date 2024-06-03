import { IsNumber, IsString } from "class-validator";

export class UserCreateDTO {
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  birthcity: string;
  @IsNumber()
  age: number;
}
