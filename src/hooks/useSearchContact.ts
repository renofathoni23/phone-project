import { gql, useLazyQuery } from "@apollo/react-hooks";

export const SEARCH_CONTACT = gql`
  query SearchContact($where: contact_bool_exp) {
    contact(where: $where) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const useSearchContact = () => {
  const [search, { data, error, loading }] = useLazyQuery(SEARCH_CONTACT, {
    fetchPolicy: "cache-and-network",
  });
  return { data, error, loading, search };
};
