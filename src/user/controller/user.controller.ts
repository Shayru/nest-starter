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
import { UserUpdateDTO } from '../dto/user-update.dto';
import { UpdateUserService } from '../use-case/update-user.service';
import { UpdateUserPasswordService } from '../use-case/update-user-password.service';
import { GetUserByIdService } from '../use-case/get-user-by-id.service';
import { makeAdminService } from '../use-case/make-admin.service';


@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getAllUserService: GetAllUsersService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly makeAdminService: makeAdminService,
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

  @Get(':id')
  getOneUserById(@Param('id', ParseIntPipe) id: number) {
    return this.getUserByIdService.get(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDTO,
  ) {
    return this.updateUserService.update(id, data);
  }

  @Put(':id/adm')
  makeAdmin(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.makeAdminService.makeAdmin(id);
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
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUserService.delete(id);
  }
}
