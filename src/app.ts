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
class App {
  private readonly page: Component & Composable;

  constructor(root: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(root);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/200/300"
    );
    this.page.addChild(image);

    const video = new VideoComponent(
      "Video Title",
      "https://www.youtube.com/zrzs8-ei-Bo"
    );
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "note content...");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Title", "study coding");
    this.page.addChild(todo);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
