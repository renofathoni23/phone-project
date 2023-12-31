import { useMutation, gql } from "@apollo/react-hooks";

export const ADD_CONTACT = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

export const useAddContact = () => {
  const [addContactMutation, { data, error, loading }] =
    useMutation(ADD_CONTACT);

  return { addContactMutation, data, error, loading };
};
