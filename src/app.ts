import { TextInput } from "./components/dialog/input/text-input.js";
import { MediaInput } from "./components/dialog/input/media-input.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { NoteComponent } from "./components/page/item/note.js";
import { ImageComponent } from "./components/page/item/image.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";
import { VideoComponent } from "./components/page/item/video.js";
import { BaseComponent, Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";

type InputComponentConstructor<T = MediaInput | TextInput> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;

  constructor(root: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(root);

    this.bindElementToDialog(
      "#new-image",
      MediaInput,
      (input: MediaInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog(
      "#new-video",
      MediaInput,
      (input: MediaInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog(
      "#new-note",
      TextInput,
      (input: TextInput) => new NoteComponent(input.title, input.content)
    );

    this.bindElementToDialog(
      "#new-todo",
      TextInput,
      (input: TextInput) => new TodoComponent(input.title, input.content)
    );
  }

  private bindElementToDialog<T extends MediaInput | TextInput>(
    selector: string,
    inputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new inputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const content = makeSection(input);
        this.page.addChild(content);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
