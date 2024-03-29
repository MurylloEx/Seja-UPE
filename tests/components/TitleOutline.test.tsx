import React from "react";
import { render } from "../core";
import { TitleOutline } from "../../src/core/components";
import { AssetWidgetCampusIcon } from "../../src/assets";

test("render of Title", () => {
  render(
    <TitleOutline
      title="Title"
      icon={AssetWidgetCampusIcon}
      bold
    />
  );
})