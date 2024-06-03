import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GetAllArticlesService } from '../use-case/get-all-articles.service';
import { GetArticleByIdService } from '../use-case/get-article-by-id.service';
import { CreateArticleService } from '../use-case/create-article.service';
import { UpdateArticleService } from '../use-case/update-article.service';
import { DeleteArticleService } from '../use-case/delete-article.service';
import { ArticleCreateDto } from '../dto/article-create.dto';
import { ArticleUpdateDto } from '../dto/article-update.dto';
import { GetArticlesByAuthorService } from '../use-case/get-articles-by-author.service';

// @Controller('articles')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('articles')
export class ArticleController {
  // injection de dépendance
  // permet d'instancier la classe ArticleService
  // dans la propriété articleService
  constructor(
    private readonly getAllArticlesService: GetAllArticlesService,
    private readonly getArticleByIdService: GetArticleByIdService,
    private readonly createArticleService: CreateArticleService,
    private readonly updateArticleService: UpdateArticleService,
    private readonly deleteArticleService: DeleteArticleService,
    private readonly getArticlesByAuthorService: GetArticlesByAuthorService,

) {}

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  @Get()
  getAllArticles() {
    return this.getAllArticlesService.getAllArticles();
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.getArticleByIdService.getOneArticleById(id);
  }

  // NestJs créé l'url voulue "/api/articles/author/:author"
  // On ajoute un author/ à l'url pour éviter d'avoir le cas ou on est pas sur d'attendre un id ou un author
  // Le :author permet de récuperer dans la fonction un paramètre du type donnée (ici string)
  // Le paramètre est envoyé à la fonction lorsque le matcher voit que l'url voulue est appelée 
  @Get('author/:author')
  getArticlesByAuthor(@Param('author') author: string) {
    //on appelle la méthode du service
    return this.getArticlesByAuthorService.getArticlesByAuthor(author);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createArticle(@Body() data: ArticleCreateDto) {
    return this.createArticleService.createArticle(data);
  }

  @Put(':id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ArticleUpdateDto,
  ) {
    return this.updateArticleService.updateArticle(id, data);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteArticleService.deleteArticle(id);
  }
}
