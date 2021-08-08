import { User } from './../auth/user.entity';
import { GetUser } from './../auth/get-user.decorator';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks(
    @GetUser() user: User,
    @Query() filterDto: GetTaskFilterDto,
  ): Promise<Task[]> {
    return this.taskService.getAllTasks(filterDto, user);
  }

  @Post()
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get(':id')
  getTaskById(@GetUser() user: User, @Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Patch(':id/status')
  updateTask(
    @GetUser() user: User,
    @Param('id') id: string,
    taskStatus: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTask(id, taskStatus, user);
  }

  @Delete(':id')
  deleteTask(@GetUser() user: User, @Param('id') id: string): Promise<null> {
    return this.taskService.deleteTask(id, user);
  }
}
