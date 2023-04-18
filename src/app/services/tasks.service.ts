import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itask } from '../interfaces/itask';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  apiUrl: string = 'http://localhost:3333/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Itask[]>(this.apiUrl);
  }

  getTask(task_id: string) {
    return this.http.get<Itask>(this.apiUrl + '/' + task_id);
  }

  createTask(task_data: any) {
    return this.http.post<Itask>(this.apiUrl, task_data);
  }

  editTask(task_id: string, task_data: any) {
    return this.http.put<Itask>(
      this.apiUrl + '/update-task/' + task_id,
      task_data,
    );
  }

  deleteTask(task_id: string) {
    return this.http.delete<Itask>(this.apiUrl + '/' + task_id);
  }
}
