import React from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Table } from "reactstrap";
import { useGetUser } from "../../hooks/getUserDetails.hooks";
import Loader from "../Loader/loader";
import "./userDetail.css";

const UserDetail = () => {
  const { id } = useParams();

  const { userData: data, isLoading } = useGetUser(id as string);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Button onClick={() => navigate("/")}>Back</Button>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>avatar</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>City</th>
            <th>pincode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.id}</td>
            <td>
              <img className="img" src={data?.avatar} alt={data?.first_name} />
            </td>
            <td>{data?.first_name + " " + data?.last_name}</td>
            <td>{data?.date_of_birth}</td>
            <td>{data?.address}</td>
            <td>{data?.city}</td>
            <td>{data?.pincode}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserDetail;
