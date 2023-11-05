import { gql, useQuery } from "@apollo/react-hooks";

const GET_CONTACT_BY_NAME = gql`
  query GetContactList($where: contact_bool_exp) {
    contact(where: $where) {
      first_name
      last_name
    }
  }
`;

export const useContactByName = (first_name: String, last_name: String) => {
  const { data, error, loading } = useQuery(GET_CONTACT_BY_NAME, {
    variables: {
      where: {
        first_name: { _like: first_name },
        last_name: { _like: last_name },
      },
    },
    fetchPolicy: "network-only",
  });
  return { data, error, loading };
};
