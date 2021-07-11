import { Button, Table } from "evergreen-ui";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Members() {
  const [members, setMembers] = useState([]);

  const router = useRouter();

  useEffect(async () => {
    const res = await axios.get("/api/members");
    setMembers(res.data.results);
  }, []);

  function handleAdd() {
    router.push("/admin/members/add");
  }

  return (
    <div>
      <Button appearance="primary" onClick={handleAdd}>
        Add Member
      </Button>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell>Balance</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>{_getTableRow(members)}</Table.Body>
      </Table>
    </div>
  );
}

function _getTableRow(data) {
  return data.map((row) => (
    <Table.Row isSelectable key={row["id"]}>
      <Table.TextCell>{row["last_name"]}</Table.TextCell>
      <Table.TextCell isNumber>{row["balance"]}</Table.TextCell>
    </Table.Row>
  ));
}
