import { render } from "test-utils";
import { Gallery, GalleryProps } from "./gallery";

describe("<Gallery />", () => {
  let props: GalleryProps;

  beforeEach(() => {
    props = {
      children: "Irrelevant children",
      view: "grid",
    };
  });

  it("should render a grid", () => {
    const { container } = render(<Gallery {...props} />);

    expect(container.firstChild).toHaveClass("gallery");
    expect(container.firstChild).not.toHaveClass("list");
  });

  it("should render a list", () => {
    props.view = "list";

    const { container } = render(<Gallery {...props} />);

    expect(container.firstChild).toHaveClass("gallery");
    expect(container.firstChild).toHaveClass("list");
  });
});
