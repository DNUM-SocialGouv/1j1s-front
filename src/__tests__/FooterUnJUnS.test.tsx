import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { FooterUnJUnS } from "../client/components/FooterUnJUnS";

describe("FooterUnJUnS", () => {
  it("renders FooterUnJUnS component", () => {
    render(<FooterUnJUnS />);

    const footer = screen.getByTestId("footer");

    expect(footer).toBeInTheDocument();
  });
});
