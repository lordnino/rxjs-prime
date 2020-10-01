import { Component, ElementRef } from '@angular/core';

// import fromEvent operator
import { fromEvent, Observable, Subscription, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs-prime';

  // grab button reference
  button: HTMLElement;

  myObservable: Observable<Event>;

  subscription: Subscription;
  secondSubscription: Subscription;

  dataSource: Observable<number> = of(1, 2, 3, 4, 5);

  ngAfterViewInit() {
    this.button = document.getElementById('myButton');
    this.myObservable = fromEvent(this.button, 'click');
    this.subscription = this.myObservable.subscribe({
      next: event => console.log(event),
      error: error => console.log(error),
      complete: () => console.log('complete!')
    });

    // addEventListener called again!!
    this.secondSubscription = this.myObservable.subscribe(event => console.log(event));
  }

  cleanUpSubscripttion() {
    this.subscription.unsubscribe();
    this.secondSubscription.unsubscribe();
  }

  subscribeToDataSource() {
    const subscription = this.dataSource
      .pipe(
        // add 1 to each emitted value
        map(value => value  + 1)
      )
      .subscribe(value => console.log(value));
  }

  filterDataSource() {
    const subscription = this.dataSource
      .pipe(
        filter(val => val >= 2)
      )
      .subscribe((val) => console.log(val));
  }
}
