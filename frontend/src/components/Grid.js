import React from "react";

import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

import { Table, Thead, Tbody, Tr, Th, Td } from "./styles/Grid";

function Grid({ users, setUsers, setOnEdit }) {
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th onlyWeb>Fone</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td width="30%">{item.nome}</Td>
              <Td width="30%">{item.email}</Td>
              <Td width="20%" onlyWeb>
                {item.fone}
              </Td>
              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} cursor="pointer" />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash
                  onClick={() => handleDelete(item.id)}
                  cursor="pointer"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default Grid;
