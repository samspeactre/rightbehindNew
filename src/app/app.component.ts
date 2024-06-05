import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoader } from './Ngrx/data.reducer';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loader$ = this.store.select(selectLoader);
  loader: boolean = true;
  private destroy$ = new Subject<void>();
  constructor(private store:Store){
    this.loader$
      .pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((loader) => {
        this.loader = loader;
        if (loader) {
          document.body.classList.add('bodyLoader');
        } else {
          document.body.classList.remove('bodyLoader');
        }
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
