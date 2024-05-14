import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { ArticleUpdateDto } from '../dto/article-update.dto';
import { ArticleCreateDto } from '../dto/article-create.dto';

Injectable();
export class ArticleService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAllarticles() {
    return await this.articleRepository.find();
  }

  async createArticle(data: ArticleCreateDto) {
    try {
      return this.articleRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
  async getOneArticleById(id: number) {
    return await this.articleRepository.findOneBy({ id });
  }

  //On lance une fonction en asynchrone pour que ça ne bloque pas l'appli.
  //Le framework ouvre un nouveau process qu'il connecte à l'appli pour renvoyer le résultat de la fonction effectuée dans le process lors du return
  // Le findby fait une demande au répository de trouver toutes les données ayant dans leur table author, l'author donnée.
  // Pour faire cette recherche, le repository la convertie en SQL
  async getArticleByAuthor(author: string) {
    return await this.articleRepository.findBy({"author" : author});
  }

  async updateArticle(id: number, data: ArticleUpdateDto) {
    // on récupère l'article ciblé
    const article = await this.articleRepository.findOneBy({ id });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'article
    const articleUpdate = { ...article, ...data };
    // on sauvegarde l'article mis à jour
    await this.articleRepository.save(articleUpdate);

    return articleUpdate;
  }
  async deleteArticle(id: number) {
    return await this.articleRepository.delete(id);
  }
}
