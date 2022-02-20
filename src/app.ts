import { TodoComponent } from "./components/page/item/todo.js";
import { NoteComponent } from "./components/page/item/note.js";
import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent } from "./components/page/page.js";
import { VideoComponent } from "./components/page/item/video.js";
class App {
  private readonly page: PageComponent;

  constructor(root: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(root);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/200/300"
    );
    image.attachTo(root, "beforeend");

    const video = new VideoComponent(
      "Video Title",
      "https://www.youtube.com/zrzs8-ei-Bo"
    );
    video.attachTo(root, "beforeend");

    const note = new NoteComponent("Note Title", "note content...");
    note.attachTo(root, "beforeend");

    const todo = new TodoComponent("Todo Title", "study coding");
    todo.attachTo(root, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement);
