import { Heading, TextInputField, Button } from "evergreen-ui";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function PaymentsAdd() {
  const [members, setMembers] = useState([]);

  const router = useRouter();

  useEffect(async () => {
    const res = await axios.get("/api/members?fields=id,last_name");
    setMembers(res.data);
  }, []);

  return (
    <div>
      <Heading size={900}>Add Payment</Heading>
      <TextInputField required label="Last Name" placeholder="Doe" />
      <Button appearance="primary">Submit</Button>
    </div>
  );
}
