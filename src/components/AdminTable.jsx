import { useState, Fragment } from "react";
import { Table } from "react-bootstrap";
import pencilIcon from "../assets/pencil-square.svg";
import trashIcon from "../assets/trash3-fill.svg";
const tableHeader = [
  {
    key: "checkbox",
    text: "",
  },
  { key: "name", text: "Name" },
  { key: "email", text: "Email" },
  { key: "role", text: "Role" },
  { key: "actions", text: "Actions" },
];
export default function AdminTable({
  userData,
  onDeleteUserById,
  onBulkDelete,
}) {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const allSelected = userData.length > 0 && userData.every((user) => selectedUserIds.includes(user.id))

  const handleDeleteUserById = (id) => {
    onDeleteUserById(id);
  }

  const handleBulkDelete = () => {
    onBulkDelete(selectedUserIds);
    setSelectedUserIds([]);
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleCheckAll = (checkAll) => {
    console.log("checkAll", checkAll);
    if (checkAll) {
      let allUsers = userData.map((user) => user.id);
      console.log(allUsers);
      setSelectedUserIds(allUsers);
    } else {
      setSelectedUserIds([]);
      console.log("else", selectedUserIds);
    }
  };

  const handleSelectedUsers = (id) => {
    setSelectedUserIds((prev) => prev.includes(id) ? prev.filter((user) => user !== id) : [...prev, id]);
  };

  return (
    <>
      <div>
        <Table className="table">
          <thead>
            <tr>
              {tableHeader.map((header, index) => {
                return (
                  <Fragment key={index}>
                    <th key={index}>
                      {header.key === "checkbox" ? (
                        <input
                          type="checkbox"
                          checked={allSelected}
                          onChange={(e) => {
                            handleCheckAll(e.target.checked);
                          }}
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
            {userData.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      value={user.id}
                      onChange={(e) => handleSelectedUsers(user.id)}
                      checked={selectedUserIds.includes(user.id)}
                    ></input>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{capitalizeFirstLetter(user.role)}</td>
                  <td>
                    <img src={pencilIcon} alt="editIcon" className="mx-2" />
                    <img
                      src={trashIcon}
                      alt="deleteIcon"
                      className="mx-2 trashIcon"
                      onClick={() => handleDeleteUserById(user.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <button className="deleteBtn" onClick={handleBulkDelete}>Delete Selected</button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </>
  );
}
