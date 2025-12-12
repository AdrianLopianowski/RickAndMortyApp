import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private dbKey = "mock_users_db";

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem("logged_in_user")
  );
  isLoggenIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  register(user: User): Observable<boolean> {
    const users = this.getUsersFromStorage();
    const exists = users.find((u) => u.login === user.login);

    if (exists) {
      return of(false);
    }

    users.push(user);
    localStorage.setItem(this.dbKey, JSON.stringify(users));

    return of(true);
  }

  login(user: User): Observable<boolean> {
    const users = this.getUsersFromStorage();
    const found = users.find(
      (u) => u.login === user.login && u.password === user.password
    );

    if (found) {
      localStorage.setItem("logged_in_user", user.login);
      this.isLoggedInSubject.next(true);
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    localStorage.removeItem("logged_in_user");
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("logged_in_user");
  }

  private getUsersFromStorage(): User[] {
    const data = localStorage.getItem(this.dbKey);
    return data ? JSON.parse(data) : [];
  }
}
