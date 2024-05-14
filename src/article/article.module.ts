import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { ArticleController } from './controller/article.controller';
import { GetAllArticlesService } from './use-case/get-all-articles.service';
import { CreateArticleService } from './use-case/create-article.service';
import { DeleteArticleService } from './use-case/delete-article.service';
import { GetArticleByIdService } from './use-case/get-article-by-id.service';
import { GetArticlesByAuthorService } from './use-case/get-articles-by-author.service';
import { UpdateArticleService } from './use-case/update-article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [
    GetAllArticlesService,
    CreateArticleService,
    DeleteArticleService,
    GetArticleByIdService,
    GetArticlesByAuthorService,
    UpdateArticleService,
  ],
})
export class ArticleModule {}
