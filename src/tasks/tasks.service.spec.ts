import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { TaskStatus } from './task.status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});
const mockUser = {
  username: faker.random.word(),
  id: faker.datatype.uuid(),
  password: faker.random.word(),
  tasks: [],
};

describe('Tasks services', () => {
  let tasksServices: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksServices = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the results', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksServices.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
    describe('getTaskById', () => {
      it('calls TasksRepository.findOne and return the result', async () => {
        const mockTask = {
          title: faker.random.words(),
          description: faker.random.words(),
          id: faker.datatype.uuid(),
          status: TaskStatus.OPEN,
        };
        tasksRepository.findOne.mockResolvedValue(mockTask);
        const result = await tasksServices.getTaskById(
          faker.random.word(),
          mockUser,
        );
        expect(result).toEqual(mockTask);
      });
      it('calls TasksRepository.findOne and handle an error', () => {
        tasksRepository.findOne.mockResolvedValue(null);
        expect(
          tasksServices.getTaskById(faker.random.word(), mockUser),
        ).rejects.toThrow(NotFoundException);
      });
    });
  });
});
