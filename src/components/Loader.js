import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center w-100">
      <Spinner />
    </div>
  );
};

export default Loader;
