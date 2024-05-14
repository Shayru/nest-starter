import { ArticleCreateDto } from '../dto/article-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entity/article.entity';
import { Repository } from 'typeorm';

export class GetArticleByIdService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
  }

  async getOneArticleById(id: number) {
    return await this.articleRepository.findOneBy({ id });
  }
}