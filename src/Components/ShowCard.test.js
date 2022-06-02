import { fireEvent, render } from "@testing-library/react";
import ShowCard from "./ShowCard";
import noImage from "../Images/No-Image-Placeholder.png";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("ShowCard Tests", () => {
  test("renders properly when props aren't null", () => {
    const testPropsOne = {
      id: 12345,
      img: { medium: "fakesource/images/12345.jpg" },
      rating: { average: 8 },
      name: "Show Title 1",
      genres: ["genre one", "genre two", "genre three"],
    };

    const component = render(
      <BrowserRouter>
        <ShowCard
          id={testPropsOne.id}
          img={testPropsOne.img?.medium}
          rating={testPropsOne.rating?.average}
          name={testPropsOne.name}
          genres={testPropsOne.genres}
        />
      </BrowserRouter>
    );

    component.getByText(testPropsOne.name);

    expect(component.getByTestId("corner-rating")).toHaveTextContent(
      testPropsOne.rating.average + " / 10"
    );

    expect(component.getByTestId("hover-rating")).toHaveTextContent(
      testPropsOne.rating.average + " / 10"
    );

    testPropsOne.genres.forEach((genre) => component.getByText(genre));

    const showImage = component.getByRole("img");
    expect(showImage).toHaveAttribute("src", testPropsOne.img.medium);
    expect(showImage).toHaveAttribute("alt", `${testPropsOne.name}-thumbnail`);
  });

  test("renders properly when nullable props are null", () => {
    const testPropsTwo = {
      id: 4245,
      img: null,
      rating: { average: null },
      name: "Show Title 2",
      genres: [],
    };

    const component = render(
      <BrowserRouter>
        <ShowCard
          id={testPropsTwo.id}
          img={testPropsTwo.img?.medium}
          rating={testPropsTwo.rating?.average}
          name={testPropsTwo.name}
          genres={testPropsTwo.genres}
        />
      </BrowserRouter>
    );

    component.getByText(testPropsTwo.name);

    expect(component.queryByTestId("corner-rating")).not.toBeInTheDocument();

    expect(component.getByTestId("hover-rating")).toHaveTextContent(
      "(unrated)"
    );

    testPropsTwo.genres.forEach((genre) => component.getByText(genre));

    const showImage = component.getByRole("img");
    expect(showImage).toHaveAttribute("src", noImage);
    expect(showImage).toHaveAttribute("alt", "no-image-thumbnail");
  });

  test("runs ReactRouter's navigate method when clicked", () => {
    const component = render(
      <BrowserRouter>
        <ShowCard />
      </BrowserRouter>
    );

    const el = component.container.querySelector(".showcard");
    fireEvent.click(el);

    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});