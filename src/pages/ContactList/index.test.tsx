import { render, fireEvent, screen } from "@testing-library/react";
import ListContact from "./index";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { GET_CONTACT_LIST } from "../../hooks/useContacts";

describe("List Contact Component", () => {
  const mocks: any = [
    {
      request: {
        query: GET_CONTACT_LIST,
        variables: {
          limit: 10,
          offset: 0,
          order_by: [{ first_name: "asc" }],
        },
      },
      result: {
        data: {
          contact: [
            {
              created_at: "2023-11-05T22:44:52.202417+00:00",
              first_name: "test",
              id: 1,
              last_name: "testing",
              phones: [
                {
                  number: "24234",
                },
              ],
            },
            {
              created_at: "2023-11-05T22:44:52.202417+00:00",
              first_name: "test2",
              id: 2,
              last_name: "testing",
              phones: [
                {
                  number: "021",
                },
              ],
            },
          ],
        },
      },
    },
  ];
  test("should render list contact component", async () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ListContact></ListContact>
        </MockedProvider>
      </Router>
    );
    const pageTitle = screen.getByText("Loading...");
    expect(await pageTitle).toBeInTheDocument();
  });

  test("should render contact data", async () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ListContact></ListContact>
        </MockedProvider>
      </Router>
    );
    expect(await screen.findByText("test2 testing")).toBeInTheDocument();
  });

  test("should render empty message after searching not found", async () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ListContact></ListContact>
        </MockedProvider>
      </Router>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search Contact With Name..."
    );

    fireEvent.change(searchInput, { target: { value: "John" } });
    expect(await screen.findByText("-")).toBeInTheDocument();
  });

  test("should render next page when click next on pagination", async () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ListContact></ListContact>
        </MockedProvider>
      </Router>
    );

    const searchButton = screen.getByText("Next");

    fireEvent.click(searchButton);
    expect(await screen.findByText("Page 2")).toBeInTheDocument();
  });
});
