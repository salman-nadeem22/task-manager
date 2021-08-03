import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  private findTaskById(id: string): [Task, number] {
    const index = this.tasks.findIndex((task) => task.id === id);
    const task = this.tasks[index];

    if (!task) {
      throw new NotFoundException();
    }

    return [task, index];
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = [...this.tasks];

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
          ? true
          : false,
      );
    }

    return tasks;
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
