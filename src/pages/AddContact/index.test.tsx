import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import AddContact from "./index";
import { ADD_CONTACT } from "../../hooks/useAddContact";

describe("Add Contact Component", () => {
  const mocks: any = [
    {
      request: {
        query: ADD_CONTACT,
        variables: {
          first_name: "John2",
          last_name: "Doe2",
          phones: [
            {
              number: "62312313109",
            },
          ],
        },
      },
    },
  ];

  test("Should render add contact component", async () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AddContact></AddContact>
        </MockedProvider>
      </Router>
    );
    const pageTitle = screen.getByText("Add Contact");
    expect(await pageTitle).toBeInTheDocument();
  });
});
