import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Itask } from 'src/app/interfaces/itask';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [IonicModule, DatePipe, RouterModule],
})
export class TaskComponent {
  @Input() task!: Itask;
  // custom event emitter
  @Output() deleteEvent = new EventEmitter();

  constructor(private tasksService: TasksService) {}

  onDelete(task_id: string) {
    if (confirm(`Are you sure you want to delete ${this.task.title} Task?`)) {
      this.tasksService
        .deleteTask(task_id)
        .subscribe((result) => console.log(result));

      // Triggering our custom event
      this.deleteEvent.emit(this.task.id);
    }
  }
}
