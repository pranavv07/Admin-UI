import { useEffect, useMemo, useState } from "react";
import AdminTable from "../components/AdminTable";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (val) => {
    setSearch(val.trim());
  };

  const handleDeleteUserById = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  }
  const handleBulkDelete = (ids) => {
    const filteredUsers = users.filter((user) => !ids.includes(user.id))
    setUsers(filteredUsers);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const searchedRes = useMemo(() => {
    return !search ? users
    : users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
          user.email.toLowerCase().includes(search.toLocaleLowerCase()) ||
          user.role.toLowerCase().includes(search.toLocaleLowerCase())
      )
  }, [search, users])

  return (
    <div className="adminContainer">
      <SearchBar search={search} handleSearch={handleSearch}></SearchBar>
      <AdminTable
        userData={searchedRes}
        onDeleteUserById={handleDeleteUserById}
        onBulkDelete={handleBulkDelete}
      ></AdminTable>
    </div>
  );
}