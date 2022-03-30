import { MediaInput } from "./input/media-input";
import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

// 다이얼로그 주석추가

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly content: string;
}

type OnCloseListener = () => void;
type OnSubmitListener = () => void;
export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;

  constructor() {
    super(`<section class="dialog">
              <button class="close">&times;</button>
              <div class="dialog__content"></div>
              <button class="dialog__submit"></button>
          </section>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLButtonElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component): void {
    const content = this.element.querySelector(
      ".dialog__content"
    )! as HTMLDivElement;

    child.attachTo(content);
  }
}
