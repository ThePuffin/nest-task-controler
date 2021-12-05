import { Test } from '@nestjs/testing';
import * as faker from 'faker';

import { TasksService } from './../../src/tasks/tasks.service';
import { TasksRepository } from './tasks.repository';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});
const mockUser = {
  username: faker.random.word(),
  id: faker.random.uuid(),
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
  });
});
