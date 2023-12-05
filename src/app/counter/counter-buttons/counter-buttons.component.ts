import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrl: './counter-buttons.component.css'
})
export class CounterButtonsComponent implements OnInit {
  ngOnInit(): void {
    
  }
  
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  
  onIncrement()
  {
    this.store.dispatch(increment());
  }
  
  onDecrement(){
    this.store.dispatch(decrement());
   
  }
  
  onReset()
  {
    this.store.dispatch(reset());
 
  }
  

  
  constructor(private store:Store<{counter: CounterState}>) {
  
    
  }
  }
  
