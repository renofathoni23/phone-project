import React from "react";
import { useMutation, gql } from "@apollo/react-hooks";

const EDIT_CONTACT = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const useEditContact = () => {
  const [editContactMutation, { data, error, loading }] =
    useMutation(EDIT_CONTACT);

  return editContactMutation;
};