import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup
} from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import ContactOverview from "../components/contacts/ContactsOverview";
import { GetContactsDocument } from "../generated/graphql";

const mocks = [
  {
    request: {
      query: GetContactsDocument
    },
    result: {
      data: {
        result: [
          {
            id: "14",
            first_name: "3van",
            last_name: "Hristov",
            email: "i.hristovv95@gmail.com",
            __typename: "Contact",
            company: {
              __typename: "Company",
              id: "1",
              company_name: "dobre sa"
            }
          },
          {
            id: "17",
            first_name: "ivancho",
            last_name: "Hristov",
            email: "i.hristov95@gmail.com",
            __typename: "Contact",
            company: {
              __typename: "Company",
              id: "2",
              company_name: "dobre sa"
            }
          }
        ]
      }
    }
  }
];

afterEach(cleanup);

describe("<ContactOverview />", () => {
  test("shoud render", async () => {
    const { findByTestId } = render(
      <MockedProvider mocks={mocks}>
        <ContactOverview path="/" />
      </MockedProvider>
    );

    const newContactButton = await findByTestId("new-contact-button");
    expect(newContactButton.textContent).toEqual("New Contact");

    const contactTableBody = await findByTestId("cotacts-table-body");
    expect(contactTableBody.children.length).toEqual(
      mocks[0].result.data.result.length
    );
  });
});
