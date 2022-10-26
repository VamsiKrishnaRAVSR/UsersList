import moment from "moment";
import { User, UserDetails } from "../../types";
import {
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { useMemo, useState } from "react";
import "./userTable.css";
import { Link } from "react-router-dom";
import { useDeleteUser, usePatchUser } from "../../hooks/getUserDetails.hooks";
import Forms from "../form/form";
import SortButton from "../sortButton/sortButton";

const UserTable = (props: UserDetails) => {
  const { data, pageNumber, setPageNumber, listLength, lastIndex, firstIndex } =
    props;
  const pageCount = Math.ceil(data.length / listLength);
  const [sortByName, setSortByName] = useState<string[]>(["id", "Asc"]);
  const [modal, setModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const toggle = () => setModal(!modal);

  const { mutate } = usePatchUser();
  const { mutate: deleteId } = useDeleteUser();

  const incrementPage = () => {
    if (pageNumber >= pageCount) {
      setPageNumber(pageCount);
    } else {
      setPageNumber((pageNumber as number) + 1);
    }
  };

  const decrementPage = () => {
    if (pageNumber <= 1) {
      setPageNumber(1);
    } else {
      setPageNumber((pageNumber as number) - 1);
    }
  };

  const pageNumberArray = useMemo(() => {
    const p = [];
    for (let i = 1; i <= pageCount; i++) {
      p.push(i);
    }
    return p;
  }, [pageCount]);

  const tableHeaders = [
    { id: "Id", name: "id", isRequired: true },
    { id: "Name", name: "first_name", isRequired: true },
    { id: "Age", name: "date_of_birth", isRequired: true },
    { id: "City", name: "city", isRequired: true },
    { id: "Edit", name: "Edit", isRequired: false },
    { id: "Delete", name: "Delete", isRequired: false },
  ];

  const updateListByName = useMemo(() => {
    console.log("entered?");
    const p =
      sortByName[1] === "Asc"
        ? data?.sort((a, b) =>
            a[sortByName[0] as keyof User] > b[sortByName[0] as keyof User]
              ? 1
              : -1
          )
        : data?.sort((a, b) =>
            a[sortByName[0] as keyof User] < b[sortByName[0] as keyof User]
              ? 1
              : -1
          );
    return [...p];
  }, [data, sortByName]);

  const slicedList = useMemo(
    () => updateListByName?.slice(firstIndex, lastIndex),
    [firstIndex, lastIndex, updateListByName]
  );

  const handleEdit = (p: User) => {
    setModal(!modal);
    setUserToEdit(p);
  };

  const handleDelete = (id: number) => {
    deleteId(String(id));
  };

  const onSubmit = (data: User) => {
    toggle();
    mutate(data);
  };

  return (
    <Table bordered hover>
      <thead>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add User</ModalHeader>
          <ModalBody>
            <Forms initialValues={userToEdit} onSubmit={onSubmit} />
          </ModalBody>
        </Modal>
        <tr>
          {tableHeaders.map((ele) => {
            const { id, isRequired, name } = ele;
            return (
              <th className="w-25">
                <div className="table_header">
                  {id}
                  {isRequired && (
                    <SortButton
                      name={name}
                      sortByName={sortByName}
                      setSortByName={setSortByName}
                    />
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {slicedList?.map((ele: User) => (
          <tr key={ele.id}>
            <td>{ele.id}</td>
            <td>
              <Link to={`/user/${ele.id}`}>
                {ele.first_name + " " + ele.last_name}
              </Link>
            </td>
            <td>
              {moment().diff(moment(ele.date_of_birth, "YYYYMMDD"), "years")}
            </td>
            <td>{ele.city}</td>
            <td>{<Button onClick={() => handleEdit(ele)}>Edit</Button>}</td>
            <td>
              {<Button onClick={() => handleDelete(ele.id)}>Delete</Button>}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <Pagination
          className="table_footer"
          aria-label="Page navigation example"
          size="xl"
        >
          <PaginationItem disabled={pageNumber === 1} onClick={decrementPage}>
            <PaginationLink previous />
          </PaginationItem>

          {pageNumberArray.map((ele) => {
            return (
              <PaginationItem onClick={() => setPageNumber(ele)}>
                <PaginationLink>{ele}</PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem
            disabled={pageNumber === pageCount}
            onClick={incrementPage}
          >
            <PaginationLink next />
          </PaginationItem>
        </Pagination>
      </tfoot>
    </Table>
  );
};

export default UserTable;
