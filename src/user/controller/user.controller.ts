import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserService } from '../use-case/create-user.service';
import { UserCreateDTO } from '../dto/user-create.dto';
import { GetAllUsersService } from '../use-case/get-all-users.service';
import { DeleteUserService } from '../use-case/delete-user.service';


@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getAllUserService: GetAllUsersService,
    private readonly deleteUserService: DeleteUserService,

) {}

  @Post()
  createUser(@Body() data: UserCreateDTO) {
    return this.createUserService.createUser(data);
  }

  @Get()
  getAllUsers() {
    return this.getAllUserService.getAllArticles();
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUserService.delete(id);
  }
}
