import { IsString } from "class-validator";

export class ArticleUpdateDto {
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsString()
  content: string;
}
