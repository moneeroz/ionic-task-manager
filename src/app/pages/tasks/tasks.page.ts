import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskComponent } from 'src/app/components/task/task.component';
import { Itask } from 'src/app/interfaces/itask';
import { TasksService } from 'src/app/services/tasks.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [IonicModule, TaskComponent, NgFor],
})
export class TasksPage implements OnInit {
  tasks: Itask[] = [];

  constructor(private service: TasksService) {}

  ngOnInit(): void {
    this.service.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  onDelete(task_id: string) {
    // remove task from UI
    const index = this.tasks.findIndex((task) => {
      // Get task index from the array
      return task.id === task_id;
    });

    // Remove task data from array
    this.tasks.splice(index, 1);

    alert('Task deleted successfully!');
  }
}
