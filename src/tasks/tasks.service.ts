import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TasksStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  private findTaskById(id: string): [Task, number] {
    const index = this.tasks.findIndex((task) => task.id === id);
    const task = this.tasks[index];
    return [task, index];
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getSingleTask(id: string): Task {
    return this.findTaskById(id)[0];
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TasksStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  //   updateTask(id: string) {
  //       const task =
  //   };
}
