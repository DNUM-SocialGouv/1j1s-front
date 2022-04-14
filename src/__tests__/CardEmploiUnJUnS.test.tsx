import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

// import userEvent from "@testing-library/user-event";
import { CardEmploiUnJUnS } from "../client/components/CardEmploiUnJUnS";

describe("CardEmploiUnJUnS", () => {
  it("renders CardEmploiUnJUnS component", () => {
    render(<CardEmploiUnJUnS />);

    const cardEmploi = screen.getByTestId("lien-emploi");

    expect(cardEmploi).toBeInTheDocument();
  });

  it("redirects the user when clicking on the card", () => {
    // TODO find a way to test user action
    // const user = userEvent.setup()
    render(<CardEmploiUnJUnS />);

    const cardEmploi = screen.getByTestId("lien-emploi");

    // user.click(cardEmploi)
    expect(cardEmploi).toBeInTheDocument();
  });
});
