import { h, render } from "preact";
import htm from "htm";
import { Filters } from "./filters";

const html = htm.bind(h);

const filtersContainer = document.querySelector("#tabs-filter") as HTMLElement;
if (filtersContainer) {
  render(html`<${Filters} />`, filtersContainer);
}
