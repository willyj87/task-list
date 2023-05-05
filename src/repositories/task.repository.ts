import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Task, TaskRelations, TaskList} from '../models';
import {TaskListRepository} from './task-list.repository';

export class TaskRepository extends DefaultCrudRepository<
  Task,
  typeof Task.prototype.id,
  TaskRelations
> {

  public readonly taskList: BelongsToAccessor<TaskList, typeof Task.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TaskListRepository') protected taskListRepositoryGetter: Getter<TaskListRepository>,
  ) {
    super(Task, dataSource);
    this.taskList = this.createBelongsToAccessorFor('taskList', taskListRepositoryGetter,);
    this.registerInclusionResolver('taskList', this.taskList.inclusionResolver);
  }
}
