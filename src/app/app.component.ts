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
  eggtimer = 0;
  eggIsDone = false;

  constructor(private todoDataService: TodoDataService, private titleService: Title, private sidebarService: NbSidebarService) {
  }
   toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  ngOnInit(): void {
  this.titleService.setTitle( 'KokaÄgg.Nu' );
  }

  /* Äggets koktid */
  egg1() {
    console.log ('Löskokt: 5min');
    const element = document.getElementById('egg1');
    element.classList.add('active');
    this.eggtimer = this.eggtimer + 6;
    console.log (this.eggtimer);
  }

  egg2() {
    console.log ('Medel: 7min');
    const element = document.getElementById('egg2');
    element.classList.add('active');
    this.eggtimer = this.eggtimer + 7 * 60;
    console.log (this.eggtimer);
  }

  egg3() {
    console.log ('Hårdkokt: 10min');
    const element = document.getElementById('egg3');
    element.classList.add('active');
    this.eggtimer = this.eggtimer + 10 * 60;
    console.log (this.eggtimer);
  }

  /* Äggets temperatur */
  temp1() {
    console.log ('Kylskåpskallt');
    const element = document.getElementById('temp1');
    element.classList.add('active');
    this.eggtimer = this.eggtimer + 30;
    console.log (this.eggtimer);
  }

  temp2() {
    console.log ('Rumstemp');
    const element = document.getElementById('temp2');
    element.classList.add('active');
    console.log (this.eggtimer);
  }

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

  eggIsReady() {
    this.titleService.setTitle( 'Dina ägg är klara!' );
    this.eggIsDone = true;
    this.addHistoryEntry('Löskokt', 'active', 32);
    this.playAudio();
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '../assets/done.wav';
    audio.load();
   /*  audio.play(); */
  }


  reset() {
    this.eggIsDone = false;
    this.running = false;
    this.timer$ = 0;
    this.resetToggle = true;


    this.addHistoryEntry('Reset timer', 'active', 32);

  }


/*
  checkConditions(val) {
    if (this.spawns.some(e => e.time === val)) {
      const spawnsStore =  this.spawns.find(x => x.time === val);
      console.log (spawnsStore);
      this.runeSpawnData(spawnsStore);
    } else {
      return;
    }
  } */

/*   runeSpawnData(spawnProperties): void {
    this.eventName = spawnProperties.text;
    this.displayRuneSpawn();
    const source2 = timer(0, 100);
    const subscribe2 = source2.subscribe(val => {
      this.timer2 = 1 / this.hinttime * 10000 * val;
      this.spawntimer = this.hinttime * 0.001 - val * .1;
      });
    setTimeout(function() {
      this.destroyRuneSpawn();
      subscribe2.unsubscribe();
      this.addHistoryEntry(spawnProperties.text, spawnProperties.color, this.timer$);
      this.timer2 = 0;
    }.bind(this), this.hinttime);
  } */

  displayRuneSpawn(): void {
    this.spawned = true;
    console.log('Power up rune spawned: spawned: ' + this.spawned);
   }

  destroyRuneSpawn(): void {
      this.spawned = false;
      console.log('Power up rune spawned: spawned: ' + this.spawned);
  }

  addCustom() {
    this.addHistoryEntry('Custom event', 'danger', this.timer$);
  }

  addHistoryEntry(title, color, timestamp) {
    this.newTodo = {
      id: 1,
      title: title,
      color: color,
      timestamp: timestamp,
      complete: false
    };
    this.todoDataService.addHistoryEntry(this.newTodo);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }

}
