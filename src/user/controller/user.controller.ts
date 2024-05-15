import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserService } from '../use-case/create-user.service';
import { UserCreateDTO } from '../dto/user-create.dto';
import { GetAllUsersService } from '../use-case/get-all-users.service';
import { DeleteUserService } from '../use-case/delete-user.service';
import { getAllUserByBirthCityService } from '../use-case/get-all-user-by-birth-city.service';
import { UserUpdateDTO } from '../dto/user-update.dto';
import { UpdateUserService } from '../use-case/update-user.service';
import { UpdateUserPasswordService } from '../use-case/update-user-password.service';
import { GetUserByIdService } from '../use-case/get-user-by-id.service copy';


@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getAllUserService: GetAllUsersService,
    private readonly getAllUserByBirthCityService: getAllUserByBirthCityService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,

) {}

  @Post()
  createUser(@Body() data: UserCreateDTO) {
    return this.createUserService.createUser(data);
  }

  @Get()
  getAllUsers() {
    return this.getAllUserService.getAllArticles();
  }

  @Get('/city')
  getUsersByBirthCity(@Query('city') city: string) {
    return this.getAllUserByBirthCityService.get(city);
  }

  @Get(':id')
  getOneUserById(@Param('id', ParseIntPipe) id: number) {
    return this.getUserByIdService.get(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDTO,
  ) {
    console.log(data)
    return this.updateUserService.update(id, data);
  }

  @Put(':id/pass')
  updateUserPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('password') password: string
  ) {
    if(password == undefined || password == "") {
      throw Error;
    }
    return this.updateUserPasswordService.update(id, password);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUserService.delete(id);
  }
}
