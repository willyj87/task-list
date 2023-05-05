import {Entity, model, property, hasMany} from '@loopback/repository';
import {Task} from './task.model';

@model()
export class TaskList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  color?: string;

  @hasMany(() => Task)
  tasks: Task[];

  constructor(data?: Partial<TaskList>) {
    super(data);
  }
}

export interface TaskListRelations {
  // describe navigational properties here
}

export type TaskListWithRelations = TaskList & TaskListRelations;
