import { IsString, MinLength } from 'class-validator';

export class ArticleCreateDto {
  @MinLength(3, {
    message: 'Le titre doit contenir au moins 3 caractères',
  })
  title: string;
  @IsString()
  author: string;
  @IsString()
  content: string;
}
