import { Heading, TextInputField, Button } from "evergreen-ui";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function MembersAdd() {
  const [lastName, setLastName] = useState("");

  const router = useRouter();

  async function handleSubmit() {
    const res = await axios.post("/api/member", { last_name: lastName });
    if (res.status === 201) {
      router.push("/admin/members");
    }
  }

  return (
    <div>
      <Heading size={900}>Add Member</Heading>
      <TextInputField
        required
        label="Last Name"
        placeholder="Doe"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Button appearance="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
