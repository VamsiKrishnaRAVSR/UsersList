import React, { useMemo, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useGetUsers, usePostUser } from "../../hooks/getUserDetails.hooks";
import { User } from "../../types";
import Forms from "../form/form";
import Loader from "../Loader/loader";
import UserTable from "../usersTable/UserTable";
import "./_main.css";

const EntireComponent = () => {
  const { data, isLoading } = useGetUsers();
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [pageSize] = useState(10);

  const lastIndex = useMemo(
    () => pageNumber * pageSize,
    [pageNumber, pageSize]
  );
  const { mutate } = usePostUser();
  const firstIndex = useMemo(() => lastIndex - pageSize, [lastIndex, pageSize]);

  const updateListBySearch = useMemo(
    () =>
      data?.filter((ele: User) => {
        const updatedName = (ele.first_name + ele.last_name).toLowerCase();
        return updatedName.includes(searchInput);
      }),
    [searchInput, data]
  );

  const onSubmit = (values: User) => {
    toggle();
    mutate(values);
  };

  // if (data) {
  //   console.log(data[data?.length - 1]?.id + 1);
  // }

  // const updatedId = useMemo(() => data[data?.length - 1]?.id, [data]);
  // console.log(updatedId);

  const initialValues = useMemo(() => {
    return {
      id: Number(data?.length + 1),
      // id: updatedId + 1,
      first_name: "",
      last_name: "",
      date_of_birth: undefined,
      address: "",
      city: "",
      pincode: undefined,
      avatar: "",
    };
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="user-container">
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add User</ModalHeader>
          <ModalBody>
            <Forms onSubmit={onSubmit} initialValues={initialValues} />
          </ModalBody>
        </Modal>

        

        <h1>User Details</h1>
        <div className="searchInput">
          <Button onClick={toggle}>Add User</Button>
          <input
            type="search"
            id="search"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPageNumber(1);
            }}
          />
        </div>
      </div>
      <UserTable
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        listLength={pageSize}
        data={updateListBySearch}
        lastIndex={lastIndex}
        firstIndex={firstIndex}
      />
    </div>
  );
};
export default EntireComponent;
