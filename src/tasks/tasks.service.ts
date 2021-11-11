import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  public getTaskskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
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

  public updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        for (const key in task) {
          if (Object.prototype.hasOwnProperty.call(task, key)) {
            if (updateTaskDto[key]) {
              task[key] = updateTaskDto[key];
            }
          }
        }
      }
      return task;
    });
    return this.getTaskById(id);
  }

  public deleteTaskById(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
