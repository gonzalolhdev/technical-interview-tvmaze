import { render } from "@testing-library/react";
import Footer from "./Footer";
import tvmLogo from "../Images/tvm-logo.png";

test("renders Footer properly", () => {
  const component = render(<Footer />);

  component.getByText("powered by:");

  const anchor = component.container.querySelector("a");
  expect(anchor).toHaveAttribute("href", "https://www.tvmaze.com/");

  const img = component.getByRole("img");
  expect(img).toHaveAttribute("src", tvmLogo);
  expect(img).toHaveAttribute("alt", "tvm-logo");
});
