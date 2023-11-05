import { useMutation, gql } from "@apollo/react-hooks";

const EDIT_NUMBER = gql`
  mutation EditPhoneNumber(
    $pk_columns: phone_pk_columns_input!
    $new_phone_number: String!
  ) {
    update_phone_by_pk(
      pk_columns: $pk_columns
      _set: { number: $new_phone_number }
    ) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;

export const useEditNumber = () => {
  const [editNumberMutation, { data, error, loading }] = useMutation(
    EDIT_NUMBER,
    { fetchPolicy: "network-only" }
  );

  return { editNumberMutation, data, error, loading };
};
