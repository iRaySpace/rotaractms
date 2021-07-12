import { Heading, Autocomplete, TextInputField, Button } from "evergreen-ui";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function PaymentsAdd() {
  const [members, setMembers] = useState([]);

  const router = useRouter();

  useEffect(async () => {
    const res = await axios.get("/api/members?fields=id,last_name");
    setMembers(res.data.results);
  }, []);

  const membersByLastName = members.map((member) => member["last_name"]);

  return (
    <div>
      <Heading size={900}>Add Payment</Heading>
      <Autocomplete
        title="Member"
        items={membersByLastName}
        onChange={(value) => console.log(value)}
      >
        {(props) => {
          const { getInputProps, getRef, inputValue } = props;
          return (
            <TextInputField
              label="Member"
              value={inputValue}
              ref={getRef}
              {...getInputProps()}
            />
          );
        }}
      </Autocomplete>
      <Button appearance="primary">Submit</Button>
    </div>
  );
}
