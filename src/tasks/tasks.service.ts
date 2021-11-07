import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './create-task.dto';
import { Task, TaskStatus } from './task.model';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
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
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
