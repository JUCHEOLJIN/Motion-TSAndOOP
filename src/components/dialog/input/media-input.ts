import { BaseComponent } from "../../component.js";

// 주석 추가

export class MediaInput extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
            <div class="form__container">
              <label for="title">Title</label>
              <input type="text" id="title" />
            </div>
            <div class="form__container">
              <label for="url">Url</label>
              <input type="text" id="url" />
            </div>
          </div>`);
  }

  get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }

  get url(): string {
    const element = this.element.querySelector("#url")! as HTMLInputElement;
    return element.value;
  }
}
