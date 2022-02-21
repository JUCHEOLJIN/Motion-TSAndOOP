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
import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
class App {
  private readonly page: Component & Composable;

  constructor(root: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(root);

    // const video = new VideoComponent(
    //   "Video Title",
    //   "https://www.youtube.com/zrzs8-ei-Bo"
    // );
    // this.page.addChild(video);

    const note = new NoteComponent("Note Title", "note content...");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Title", "study coding");
    this.page.addChild(todo);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const mediaInput = new MediaInput();
      dialog.addChild(mediaInput);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const image = new ImageComponent(mediaInput.title, mediaInput.url);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
    });

    const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
    videoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const mediaInput = new MediaInput();
      dialog.addChild(mediaInput);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        console.log(mediaInput.url);
        const video = new VideoComponent(mediaInput.title, mediaInput.url);
        this.page.addChild(video);
        dialog.removeFrom(dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
