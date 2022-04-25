import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { CardEmploiUnJUnS } from "~/client/components/CardEmploiUnJUnS";

describe("CardEmploiUnJUnS", () => {
  it("renders CardEmploiUnJUnS component", () => {
    render(<CardEmploiUnJUnS />);

    const cardEmploi = screen.getByTestId("lien-emploi");

    expect(cardEmploi).toBeInTheDocument();
  });

  it("redirects the user when clicking on the card", () => {
    render(<CardEmploiUnJUnS />);

    const cardEmploi = screen.getByTestId("lien-emploi");

    expect(cardEmploi).toBeInTheDocument();
  });
});
