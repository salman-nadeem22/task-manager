import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';

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
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, body: UpdateTaskDto): Task {
    const [, index] = this.findTaskById(id);
    const keys = Object.keys(body);

    Object.values(body).forEach((value, i) => {
      if (value) {
        this.tasks[index][keys[i]] = value;
      }
    });

    return this.tasks[index];
  }

  deleteTask(id: string): null {
    const [, index] = this.findTaskById(id);
    this.tasks.splice(index, 1);

    return null;
  }
}
