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
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getAllTasks(filterDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Patch(':id/status')
  updateTask(@Param('id') id: string, taskStatus: TaskStatus): Promise<Task> {
    return this.taskService.updateTask(id, taskStatus);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<null> {
    return this.taskService.deleteTask(id);
  }
}
