import { ArticleCreateDto } from '../dto/article-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entity/article.entity';
import { Repository } from 'typeorm';

export class DeleteArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
  }

  async deleteArticle(id: number) {
    return await this.articleRepository.delete(id);
  }
}