import { render } from "@testing-library/react";
import Header from "./Header";
import logo from "../Images/logo.svg";
import { BrowserRouter } from "react-router-dom";

test("renders Header properly", () => {
  const component = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  component.getByText("Show");

  component.getByText("Finder");

  const link = component.container.querySelector("a");
  expect(link).toHaveAttribute("href", "/");

  const reactlogo = component.getByRole("img");
  expect(reactlogo).toHaveAttribute("src", logo);
  expect(reactlogo).toHaveAttribute("alt", "logo");
});
