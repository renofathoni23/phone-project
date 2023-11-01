import React, { useState } from "react";
import { useGetContactDetail } from "../../hooks/useGetContactDetail";
import { Params, useParams } from "react-router-dom";

interface Phone {
  number: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  phones: Phone[];
}
const EditContact: React.FC = () => {
  const { id } = useParams<Params>();
  const parseId = id ? parseInt(id) : 0;

  const { data, error, loading } = useGetContactDetail(parseId);
  console.log(data);
  const contact = data?.contact_by_pk;
  const initialData: FormData = {
    first_name: "",
    last_name: "",
    phones: [{ number: "" }],
  };
  const [formData, setFormData] = useState<FormData>(initialData);

  console.log(formData);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {contact.first_name} {contact.last_name}
    </div>
  );
};

export default EditContact;
