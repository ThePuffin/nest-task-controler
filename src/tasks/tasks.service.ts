import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // public getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  // public getTaskskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // public createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // public updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   this.tasks = this.tasks.map((task) => {
  //     if (task.id === id) {
  //       for (const key in task) {
  //         if (Object.prototype.hasOwnProperty.call(task, key)) {
  //           if (updateTaskDto[key]) {
  //             task[key] = updateTaskDto[key];
  //           }
  //         }
  //       }
  //     }
  //     return task;
  //   });
  //   return this.getTaskById(id);
  // }
  // public deleteTaskById(id: string): void {
  //   this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
}
