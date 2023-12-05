import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { customIncrement } from '../state/counter.actions';
import { Observable } from 'rxjs';
import { getCounter } from '../state/counter.selectors';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.css'
})
export class CustomCounterInputComponent implements OnInit {

  counter$:Observable<number>
  
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {

    this.counter$ = this.store.select(getCounter)
    this.counter$.subscribe((data) => {
      this.value= data
    })

    

  }
  value:number


  onAdd(){
    this.store.dispatch(customIncrement({value: +this.value}))
  }
}
