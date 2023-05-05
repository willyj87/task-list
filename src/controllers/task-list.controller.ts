import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TaskList} from '../models';
import {TaskListRepository} from '../repositories';

export class TaskListController {
  constructor(
    @repository(TaskListRepository)
    public taskListRepository : TaskListRepository,
  ) {}

  @post('/task-lists')
  @response(200, {
    description: 'TaskList model instance',
    content: {'application/json': {schema: getModelSchemaRef(TaskList)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskList, {
            title: 'NewTaskList',
            exclude: ['id'],
          }),
        },
      },
    })
    taskList: Omit<TaskList, 'id'>,
  ): Promise<TaskList> {
    return this.taskListRepository.create(taskList);
  }

  @get('/task-lists/count')
  @response(200, {
    description: 'TaskList model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TaskList) where?: Where<TaskList>,
  ): Promise<Count> {
    return this.taskListRepository.count(where);
  }

  @get('/task-lists')
  @response(200, {
    description: 'Array of TaskList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TaskList, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TaskList) filter?: Filter<TaskList>,
  ): Promise<TaskList[]> {
    return this.taskListRepository.find(filter);
  }

  @patch('/task-lists')
  @response(200, {
    description: 'TaskList PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskList, {partial: true}),
        },
      },
    })
    taskList: TaskList,
    @param.where(TaskList) where?: Where<TaskList>,
  ): Promise<Count> {
    return this.taskListRepository.updateAll(taskList, where);
  }

  @get('/task-lists/{id}')
  @response(200, {
    description: 'TaskList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TaskList, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TaskList, {exclude: 'where'}) filter?: FilterExcludingWhere<TaskList>
  ): Promise<TaskList> {
    return this.taskListRepository.findById(id, filter);
  }

  @patch('/task-lists/{id}')
  @response(204, {
    description: 'TaskList PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskList, {partial: true}),
        },
      },
    })
    taskList: TaskList,
  ): Promise<void> {
    await this.taskListRepository.updateById(id, taskList);
  }

  @put('/task-lists/{id}')
  @response(204, {
    description: 'TaskList PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() taskList: TaskList,
  ): Promise<void> {
    await this.taskListRepository.replaceById(id, taskList);
  }

  @del('/task-lists/{id}')
  @response(204, {
    description: 'TaskList DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.taskListRepository.deleteById(id);
  }
}
