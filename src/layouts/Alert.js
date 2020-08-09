import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

//AlertMsg component to display a list of the alert messagess
const AlertMsg = () => {
  //Global state: get the alert object from redux store
  const alerts = useSelector((state) => state.alert);

  return (
    alerts !== null && alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert key={alert.id} variant={alert.alertType}>
        {alert.msg}
      </Alert>
    ))
  );
};

export default AlertMsg;