import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from './todo';


import {TodoDataService} from './todo-data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { NbSidebarService } from '@nebular/theme';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TaskService } from './firestore.service';
import { config } from './firestore.config';
import { Task } from './firestore.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes.toString().padStart(2, '0') + ':' +
        (value - minutes * 60).toString().padStart(2, '0');
  }
}

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}

export interface ApiInterface {
  ip: string;
  region: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'translateX(+100%)'}),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'}))
      ])
    ])
  ]
})



export class StopwatchComponent implements OnInit {
  timer$;
  timer2;
  timer3;
  spawnsPre: any = [2, 35];
  spawnsPre2: any = [18, 52];
  spawned = false;
  hinttime = 15000;
  spawntimer;
  running = false;
  newTodo: Todo = new Todo();
  eventName;

  subscription;
  resetToggle = false;
  eggtimer = 7 * 60;
  eggIsDone = false;
  likes = 10;

  myTask = 'hejsan';
  tasks: Observable<any[]>;
  editMode = false;
  taskToEdit: any = {};
  testResponse: any;
  userTestStatus: { ip: string, region: string }[];
  API_URL = 'https://ipapi.co/json/';
  private  contacts:  Array<object> = [];
  egg = {type: 'medium', starttemp: 'cool', sound: true, region: 'region', ip: 'ip-adress' };

  constructor(
    private todoDataService: TodoDataService,
    private titleService: Title,
    private sidebarService: NbSidebarService,
    private db: AngularFirestore,
    private taskService: TaskService,
    private httpClient:  HttpClient
    ) { }
    get debug() { return JSON.stringify(this.egg); }

  /* UI FUNCTIONS */
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  /* ON INIT FUNCTIONS */
  ngOnInit(): void {
    this.getIp();
    this.titleService.setTitle( 'KokaÄgg.Nu' );
    this.tasks = this.db
    .collection(config.collection_endpoint)
    .snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        // Get document data
        const data = a.payload.doc.data() as Task;

        // Get document id
        const id = a.payload.doc.id;

        // Use spread operator to add the id to the document data
        return { id, ...data };
      });
    }));
  }

  updateEggTimer () {
    console.log ('running eggtimer update');
    this.eggtimer = 0;
    if (this.egg.type === 'löskokt') {
      this.eggtimer = this.eggtimer + 4;
    }
    if (this.egg.type === 'mjukkokt') {
      this.eggtimer = this.eggtimer + 500;
    }
    if (this.egg.type === 'hårdkokt') {
      this.eggtimer = this.eggtimer + 600;
    }
    if (this.egg.starttemp === 'cool') {
      this.eggtimer = this.eggtimer + 30;
    }
  }

  /* GET IP AND REGION */
  getIp() {
    this.getContacts().subscribe((data:  ApiInterface) => {

      console.log(data);
      this.testResponse = data.region;
      this.egg.region = data.region;
      this.egg.ip = data.ip;
  });
  }

  getContacts() {
    return  this.httpClient.get(`${this.API_URL}`);
  }

  saveTask() {
    console.log ('Saves new');
    if (this.myTask !== null) {
      // Get the input value

      if (!this.editMode) {
        console.log(this.egg);
        this.taskService.addTask(this.egg);
      } else {
        // Get the task id
        const taskId = this.taskToEdit.id;

        // update the task
        this.taskService.updateTask(taskId, this.egg);
      }

      // set edit mode to false and clear form
      this.editMode = false;
      this.myTask = '';
    }
} // saveTask

  deleteTask(task) {
    // Get the task id
    const taskId = task.id;

    // delete the task
    this.taskService.deleteTask(taskId);
  } // deleteTask


  /* TIMER START FUNCTION */
  startTimer() {
    this.resetToggle = false;
    this.titleService.setTitle( 'Kokar ägg...' );
    const timeInSeconds = this.eggtimer;
    console.log (timeInSeconds);
    this.running = true;
    console.log ('Startar timer');
    const source1 = timer(0, 1000);
    this.subscription = source1.subscribe(val => {
      this.timer$ = val;
      this.timer2 = 1 / timeInSeconds * 100 * val;
      console.log (this.timer$);
      if (this.timer$ === timeInSeconds) {
        console.log ('egg is ready');
        this.eggIsReady();
        return;
      }
      if (this.resetToggle === true ) {
        this.subscription.unsubscribe();
      }
    });

  }


  /*  EGG IS READY */
  eggIsReady() {
    this.titleService.setTitle( 'Dina ägg är klara!' );
    this.eggIsDone = true;
    if (this.egg.sound === true) {
      this.playAudio();
    }
  }



  playAudio() {
    const audio = new Audio();
    audio.src = '../assets/done.wav';
    audio.load();
    audio.play();
  }

 /*  RESET FUNCTION */
  reset() {
    console.log ('Resetting timer, eggdone =false, running =false');
    this.eggIsDone = false;
    this.running = false;
    this.timer$ = 6 * 60;
    this.resetToggle = true;
  }

}
