import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TaskList, TaskListRelations, Task} from '../models';
import {TaskRepository} from './task.repository';

export class TaskListRepository extends DefaultCrudRepository<
  TaskList,
  typeof TaskList.prototype.id,
  TaskListRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Task, typeof TaskList.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(TaskList, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', taskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }

  public findByTitle(title: string) {
    return this.findOne({where: {title}});
  }
}
