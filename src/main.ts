import { h, render } from "preact";
import htm from "htm";
import { Filters } from "./filters";
import { store } from "./store";

const html = htm.bind(h);

const filtersContainer = document.querySelector("#tabs-filter") as HTMLElement;
if (filtersContainer) {
  render(html`<${Filters} />`, filtersContainer);
}

const saveBtn = document.querySelector<HTMLElement>("#save-btn");
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    console.log(store.getState().draftFilters);
  });
}
