import { ArticleCreateDto } from '../dto/article-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entity/article.entity';
import { Repository } from 'typeorm';

export class GetArticlesByAuthorService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
  }

  //requete qui va aller chercher tous les articles ayant pour auteur celui passé en paramètre.
  //méthode asynchrone qui va se mettre dans la stack de l'event loop et donc sort du processus initial
  //cela permet de continuer le processus sans avoir besoin d'attendre la réponse(tr-
  async getArticlesByAuthor(author: string) {
    // il y a un await pour attendre une réponse de la bdd avant de renvoyer le résultat.
    //findBy est une méthode par défaut du repository
    // qui va aller chercher autant de d'articles qui ont le même nom d'auteur
    return await this.articleRepository.findBy({ author: author });
  }
}