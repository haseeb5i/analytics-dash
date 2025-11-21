import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import htm from "htm";
import Litepicker from "litepicker";
import TomSelect from "tom-select";

import type { TomTemplate, TomSettings } from "tom-select/src/types/index.ts";

const html = htm.bind(h);

type SelectProps = {
  id?: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  path: string;
  multiple: boolean;
  tomSelectOpts?: TomSettings;
  classes?: {
    container?: string;
  };
};

function Select(props: SelectProps) {
  const ref = useRef<HTMLSelectElement>(null);
  const cx = props.classes ?? {};

  const renderItem: TomTemplate = (data, escape) => {
    return "<div>" + escape(data.text) + "</div>";
  };
  const renderOption: TomTemplate = (data, escape) => {
    return "<div>" + escape(data.text) + "</div>";
  };

  useEffect(() => {
    if (ref.current) {
      new TomSelect(ref.current, {
        allowEmptyOption: true,
        render: {
          item: renderItem,
          option: renderOption,
        },
        ...props.tomSelectOpts,
      });
    }
  }, []);

  return html`
    <div class="${cx.container}">
      <div class="form-label">${props.label}</div>
      <select
        ref=${ref}
        class="form-select"
        id=""
        data-path="${props.path}"
        multiple=${props.multiple}
      >
        ${props.options.map(
          (item) =>
            html`<option key=${item.value} value=${item.value}>
              ${item.label}
            </option>`,
        )}
      </select>
    </div>
  `;
}

type DateRangePickerProps = {
  name: string;
  label: string;
  classes?: {
    container?: string;
  };
};

function DateRangePicker(props: DateRangePickerProps) {
  const [show, setShow] = useState(false);
  const pickerRef = useRef<Litepicker>();
  const cx = props.classes ?? {};

  useEffect(() => {
    const startElem = document.querySelector<HTMLElement>(
      "#datepicker-range-start",
    );
    const endElem = document.querySelector<HTMLElement>(
      "#datepicker-range-end",
    );

    if (startElem && endElem) {
      console.log(pickerRef.current);
      pickerRef.current = new Litepicker({
        element: startElem,
        elementEnd: endElem,
        singleMode: false,
      });
    }
    console.log(pickerRef.current);
  }, []);

  return html`
    <div class="${cx.container}">
      <${Select}
        label="Date Range"
        options=${[
          { value: "", label: "None" },
          { value: "x", label: "Custom Dates" },
          { value: "7", label: "Last 7 days" },
          { value: "14", label: "Last 14 days" },
        ]}
        tomSelectOpts=${{
          onChange: function (newValue) {
            if (newValue === "x") {
              setShow(true);
            } else {
              setShow(false);
            }
          },
        } as TomSettings}
      />
      <div class="form-control relative" hidden=${!show}>
        <div class="flex align-items-center">
          <span>Start: </span>
          <input
            class="col-3 border-0"
            placeholder="Select start date"
            id="datepicker-range-start"
          />
          <span class="col-1">End: </span>
          <input
            class="col-3 border-0"
            placeholder="Select end date"
            id="datepicker-range-end"
          />
        </div>
        <div
          class="picker-show"
          onClick=${() => pickerRef.current?.show()}
        ></div>
      </div>
    </div>
  `;
}

export function Filters() {
  return html`
    <div>
      <div class="mb-2">
        <div class="form-label">Name</div>
        <input
          type="text"
          class="form-control"
          placeholder="Critera name"
          name="example-text-input"
        />
      </div>

      <div class="mb-3">
        <${DateRangePicker} classes=${{ container: "mb-3" }} />
      </div>

      <h4>Income</h4>
      <div class="mb-2">
        <label class="form-label">
          Exclude Recurring Regular Income

          <span
            class="form-help"
            data-bs-toggle="popover"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-content="<p>some help</p>"
            >?</span
          >
        </label>
        <div class="btn-group w-100" role="group">
          <input
            type="radio"
            class="btn-check"
            name="btn-radio-basic"
            id="btn-radio-basic-1"
            autocomplete="off"
            checked
          />
          <label for="btn-radio-basic-1" type="button" class="btn btn-sm"
            >Yes</label
          >
          <input
            type="radio"
            class="btn-check"
            name="btn-radio-basic"
            id="btn-radio-basic-2"
            autocomplete="off"
          />
          <label for="btn-radio-basic-2" type="button" class="btn btn-sm"
            >No</label
          >
        </div>
      </div>
      <${Select}
        label="Type"
        options=${[
          { value: "1", label: "Regular Donation" },
          { value: "2", label: "Single Donation" },
        ]}
        multiple
        classes=${{ container: "mb-2" }}
      />
    </div>
  `;
}
