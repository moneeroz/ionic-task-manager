import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, NgFor, NgIf],
})
export class AddTaskPage {
  taskForm;
  editMode: boolean = false;
  editTaskId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.taskForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      task_date: [new Date('').toJSON(), Validators.required],
      catagory: ['', Validators.required],
      priority_level: ['', Validators.required],
      progress_level: ['', Validators.required],
    });

    // Get task id from current url
    const task_id = this.activatedRoute.snapshot.paramMap.get('task_id');

    // Check if task id was specified, if true we are in edit mode else we are on create mode
    if (task_id !== null) {
      this.editMode = true;
      this.editTaskId = task_id;

      // Get task data from database and populate the form inputs with the data
      tasksService
        .getTask(task_id)
        .subscribe((result) => this.taskForm.patchValue(result));
    }
  }

  get titleFormControl() {
    return this.taskForm.get('title');
  }

  get descriptionFormControl() {
    return this.taskForm.get('description');
  }

  get taskDateFormControl() {
    return this.taskForm.get('task_date');
  }

  get catagoryFormControl() {
    return this.taskForm.get('catagory');
  }

  get priorityLevelFormControl() {
    return this.taskForm.get('priority_level');
  }

  get progressLevelFormControl() {
    return this.taskForm.get('progress_level');
  }

  onSubmit() {
    const task_data = this.taskForm.value;

    if (this.editMode) {
      this.tasksService
        .editTask(this.editTaskId, task_data)
        .subscribe((result) => console.log(result));
    } else {
      this.tasksService
        .createTask(task_data)
        .subscribe((result) => console.log(result));

      this.taskForm.reset();
    }

    this.route.navigateByUrl('tasks');
  }
}
