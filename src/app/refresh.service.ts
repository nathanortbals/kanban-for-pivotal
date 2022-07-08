import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private readonly refreshSubject = new BehaviorSubject<void>(undefined);

  public readonly refresh$ = this.refreshSubject.asObservable();

  constructor() {}

  public refresh() {
    this.refreshSubject.next();
  }
}
