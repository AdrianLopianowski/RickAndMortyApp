import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.interface";

@Component({
  selector: "app-login",
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container login-container">
      <div class="login-box">
        <h2 class="creepster-font">{{ isLoginMode ? "Zaloguj sie" : "Rejestracja" }}</h2>

        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Login</label>
            <input
              type="text"
              [(ngModel)]="user.login"
              name="login"
              required
              placeholder="Wpisz login..."
            />
          </div>

          <div class="form-group">
            <label>Hasło</label>
            <input
              type="password"
              [(ngModel)]="user.password"
              name="password"
              required
              placeholder="Wpisz hasło..."
            />
          </div>

          <button type="submit" class="action-btn" [disabled]="isLoading">
            {{ isLoading ? "Przetwarzanie..." : isLoginMode ? "Wejdź" : "Stwórz Konto" }}
          </button>
        </form>

        <p class="switch-mode">
          <button type="button" class="link-btn" (click)="toggleMode()">
            {{
              isLoginMode ? "Nie masz konta? Zarejestruj się" : "Masz konto? Zaloguj się"
            }}
          </button>
        </p>

        <p
          *ngIf="message"
          [class.error]="isError"
          [class.success]="!isError"
          class="message"
        >
          {{ message }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 60vh;
      }
      .login-box {
        background-color: #1f2937;
        padding: 40px;
        border-radius: 12px;
        border: 2px solid #374151;
        width: 100%;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      }
      .creepster-font {
        font-family: "Creepster", cursive;
        font-size: 3rem;
        color: #97ce4c;
        text-shadow: 3px 3px 0 #06b6d4;
        margin-bottom: 20px;
      }
      .form-group {
        margin-bottom: 20px;
        text-align: left;
      }
      label {
        display: block;
        color: #9ca3af;
        margin-bottom: 5px;
        font-size: 0.9rem;
      }
      input {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #374151;
        background-color: #111827;
        color: white;
        font-size: 1rem;
      }
      input:focus {
        outline: none;
        border-color: #06b6d4;
        box-shadow: 0 0 5px #06b6d4;
      }
      .action-btn {
        width: 100%;
        padding: 12px;
        background-color: #06b6d4;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
      }
      .action-btn:hover {
        background-color: #97ce4c;
        color: black;
      }
      .action-btn:disabled {
        background-color: #4b5563;
        cursor: not-allowed;
      }
      .switch-mode {
        margin-top: 20px;
        color: #9ca3af;
        font-size: 0.9rem;
      }
      .link-btn {
        background: none;
        border: none;
        color: #06b6d4;
        cursor: pointer;
        text-decoration: underline;
        font-weight: bold;
      }
      .message {
        margin-top: 15px;
        font-weight: bold;
      }
      .error {
        color: #ef4444;
      }
      .success {
        color: #97ce4c;
      }
    `,
  ],
})
export class LoginComponent {
  user: User = { login: "", password: "" };

  isLoginMode = true;
  isLoading = false;
  message = "";
  isError = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = "";
    this.user = { login: "", password: "" };
  }

  onSubmit() {
    if (!this.user.login || !this.user.password) {
      this.showMessage("Wypełnij wszystkie pola", true);
      return;
    }

    this.isLoading = true;
    this.message = "";

    if (this.isLoginMode) {
      //LOGOWANIE

      this.authService.login(this.user).subscribe((success) => {
        this.isLoading = false;

        if (success) {
          this.showMessage("Zalogowano! Przekierowanie...", false);
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 1000);
        } else {
          this.showMessage("Błędny login lub hasło", true);
        }
      });
    } else {
      //REJESTRACJA
      this.authService.register(this.user).subscribe((success) => {
        this.isLoading = false;

        if (success) {
          this.showMessage("Konto utworzone! Zaloguj się.", false);
          this.toggleMode();
        } else {
          this.showMessage("Taki użytkownik już istnieje.", true);
        }
      });
    }
  }

  showMessage(text: string, isError: boolean) {
    this.message = text;
    this.isError = isError;
  }
}
