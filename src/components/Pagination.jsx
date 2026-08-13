import { useState } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent({ users }) {
  const [state, setState] = useState({
    data: [...users],
    limit: 10,
    activePage: 1,
  });
  const handlePageChange = (pageNumber) => {
    setState((prev) => ({ ...prev, data: users, activePage: pageNumber }));
  };
  return (
    <Pagination>
      {state.data.map((item, index) => {
        return (
          <Pagination.Item
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            active={index + 1 === state.activePage}
          >{index + 1}</Pagination.Item>
        );
      })}
      {/* {state.data} */}
      {/* <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last /> */}
    </Pagination>
  );
}
