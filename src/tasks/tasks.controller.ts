import { TasksService } from './tasks.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getSingleTask(@Param('id') id: string): Task {
    return this.taskService.getSingleTask(id);
  }

  //   @Patch(':id')
  //   updateTask(@Param('id') id: string, @Body): Task {
  //     return this.taskService.updateTask(id);
  //   }

  @Post()
  createTasks(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
}
