import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import EditContact from "./index";
import { GET_CONTACT_DETAIL } from "../../hooks/useGetContactDetail";

describe("List Edit Component", () => {
  const mocks: any = [
    {
      delay: 30,
      request: {
        query: GET_CONTACT_DETAIL,
        variables: {
          id: 0,
        },
      },
      result: {
        data: {
          contact_by_pk: {
            created_at: "2023-11-05T22:44:52.202417+00:00",
            first_name: "test",
            id: 0,
            last_name: "testing",
            phones: [
              {
                number: "24234",
              },
            ],
          },
        },
      },
    },
  ];

  test("should render loading on contact component", async () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <EditContact></EditContact>
        </MockedProvider>
      </Router>
    );
    const loading = screen.findByText("loading...");
    await loading;
  });

  test("should render edit contact component", async () => {
    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <EditContact></EditContact>
        </MockedProvider>
      </Router>
    );
    const loading = screen.findByText("loading...");
    await loading;

    expect(await screen.findByText("View Contact")).toBeInTheDocument();
  });
});
