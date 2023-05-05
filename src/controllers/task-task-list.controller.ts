import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Task,
  TaskList,
} from '../models';
import {TaskRepository} from '../repositories';

export class TaskTaskListController {
  constructor(
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
  ) { }

  @get('/tasks/{id}/task-list', {
    responses: {
      '200': {
        description: 'TaskList belonging to Task',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TaskList),
          },
        },
      },
    },
  })
  async getTaskList(
    @param.path.number('id') id: typeof Task.prototype.id,
  ): Promise<TaskList> {
    return this.taskRepository.taskList(id);
  }
}
