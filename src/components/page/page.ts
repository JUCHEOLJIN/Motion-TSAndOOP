import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type onDeleteListener = () => void;

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private deleteListener?: onDeleteListener;
  constructor() {
    super(`<li class="page-item">
            <section class="page-item__content"></section>
            <div class="page-item__controls">
              <button class="page-item__delete">&times</button>
            </div>
          </li>`);

    const deleteBtn = this.element.querySelector(
      ".page-item__delete"
    )! as HTMLButtonElement;
    deleteBtn.onclick = () => {
      this.deleteListener && this.deleteListener();
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__content"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnDeleteListener(listener: onDeleteListener) {
    this.deleteListener = listener;
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<ul class="page">This Page Component</ul>`);
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnDeleteListener(() => {
      item.removeFrom(this.element);
    });
  }
}
