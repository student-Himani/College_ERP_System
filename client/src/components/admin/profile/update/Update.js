import React, { useEffect } from "react";
import Body from "./Body";
import { useDispatch } from "react-redux";
import { getAllDepartment } from "../../../../redux/actions/adminActions";

const Update = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);
  return <Body />;
};

export default Update;
