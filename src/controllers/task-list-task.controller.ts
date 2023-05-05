import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TaskList,
  Task,
} from '../models';
import {TaskListRepository} from '../repositories';

export class TaskListTaskController {
  constructor(
    @repository(TaskListRepository) protected taskListRepository: TaskListRepository,
  ) { }

  @get('/task-lists/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of TaskList has many Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Task)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Task>,
  ): Promise<Task[]> {
    return this.taskListRepository.tasks(id).find(filter);
  }

  @post('/task-lists/{id}/tasks', {
    responses: {
      '200': {
        description: 'TaskList model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TaskList.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInTaskList',
            exclude: ['id'],
            optional: ['taskListId']
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {
    return this.taskListRepository.tasks(id).create(task);
  }

  @patch('/task-lists/{id}/tasks', {
    responses: {
      '200': {
        description: 'TaskList.Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
    task: Partial<Task>,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.taskListRepository.tasks(id).patch(task, where);
  }

  @del('/task-lists/{id}/tasks', {
    responses: {
      '200': {
        description: 'TaskList.Task DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.taskListRepository.tasks(id).delete(where);
  }
}
