import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private aluno: any;
  private id_aluno: any;

  setAluno(data: any, id:any): void {
    this.aluno = data;
    this.id_aluno = id;
  }

  getAluno(): any {
    return this.aluno;
  }
  
  getAlunoId(): any {
    return this.id_aluno;
  }
}
