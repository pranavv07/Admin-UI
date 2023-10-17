import { Fragment, useEffect, useState } from "react";
import "./assets/App.css";
import pencilIcon from "./assets/pencil-square.svg";
import trashIcon from "./assets/trash3-fill.svg";

const tableHeader = [
  {
    key: "select",
    text: "",
  },
  { key: "name", text: "Name" },
  { key: "email", text: "Email" },
  { key: "role", text: "Role" },
  { key: "actions", text: "Actions" },
];

export default function App() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  let [checkAll, setCheckAll] = useState(false);
  let [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckAll = () => {
    setCheckAll((checkAll = !checkAll));
    console.log("checkAll", checkAll);
    if (checkAll) {
      console.log("checkAllTrueee", checkAll);
      let allUsers = users.map((user) => user.id);
      setSelectedUsers(allUsers);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectedUsers = (id) => {
    // // console.log(id);
    // if(selectedUsers.length){
    //   var findUser = selectedUsers?.find((user)=> id === user.id);
    // }
    // console.log(findUser);
    // if(findUser!==undefined){
    //   let index = selectedUsers.indexOf(id);
    //   console.log("index",index);
    //   setSelectedUsers(selectedUsers.splice(index,id));
    // }
    // else {
    //   selectedUsers.push(parseInt(id))
    //   setSelectedUsers(selectedUsers);
    // }
  };

  const handleFilter = (val) => {
    setFilter(val);
  };

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((users) => {
        return filter.length
          ? users.filter(
              (user) =>
                user.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
                user.email.toLowerCase().includes(filter.toLocaleLowerCase()) ||
                user.role.toLowerCase().includes(filter.toLocaleLowerCase())
            )
          : users;
      })
      .then((json) => setUsers(json))
      .catch((error) => console.error(error));
  }, [filter, users]);

  return (
    <div className="adminContainer">
      <SearchBar filter={filter} handleFilter={handleFilter}></SearchBar>
      <AdminTable
        users={users}
        checkAll={checkAll}
        handleCheckAll={handleCheckAll}
        selectedUsers={selectedUsers}
        handleSelectedUsers={handleSelectedUsers}
      ></AdminTable>
    </div>
  );
}

function SearchBar({ filter, handleFilter }) {
  return (
    <>
      <div className="row searchUser">
        <input
          placeholder="Search by name, email or role"
          name={filter}
          onChange={(e) => handleFilter(e.target.value)}
        ></input>
      </div>
    </>
  );
}

function AdminTable({
  users,
  checkAll,
  handleCheckAll,
  selectedUsers,
  handleSelectedUsers,
}) {
  let [enableEdit, setEnableEdit] = useState(false);
  // eslint-disable-next-line no-unused-vars

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleEdit = () => {
    setEnableEdit((enableEdit = !enableEdit));
    console.log("enableEdit", enableEdit);
  };

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              {tableHeader.map((header, index) => {
                return (
                  <Fragment key={index}>
                    <th key={index}>
                      {header.key === "select" ? (
                        <input
                          type="checkbox"
                          defaultChecked={checkAll}
                          onClick={handleCheckAll}
                          onChange={(e) => {}}
                        ></input>
                      ) : (
                        header.text
                      )}
                    </th>
                  </Fragment>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      value={user.id}
                      onClick={(e) => handleSelectedUsers(e.target.value)}
                      onChange={(e) => {}}
                      defaultChecked={false}
                    ></input>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{capitalizeFirstLetter(user.role)}</td>
                  <td>
                    <img
                      src={pencilIcon}
                      alt="editIcon"
                      className="mx-2"
                      onClick={handleEdit}
                    />
                    <img
                      src={trashIcon}
                      alt="deleteIcon"
                      className="mx-2 trashIcon"
                    />
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <button className="deleteBtn">Delete Selected</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
