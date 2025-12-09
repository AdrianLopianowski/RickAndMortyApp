import { Component } from "@angular/core";

@Component({
  selector: "app-suprise-me",
  template: ` <main class="container">
    <div class="surprise-box">
      <h2>Zaskocz Mnie!</h2>
      <p>Kliknij, aby wylosować postać.</p>
      <button class="button">Losuj</button>
    </div>
  </main>`,
  styles: [
    `
      .surprise-box {
        background-color: #1f2937;
        border: 1px solid #374151;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 32px;
      }
      .button {
        background-color: #06b6d4;
        color: white;
        font-weight: 700;
        padding: 8px 24px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        margin-top: 16px;
      }
    `,
  ],
})
export class SupriseMeComponent {}
