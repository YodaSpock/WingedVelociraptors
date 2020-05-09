import React, { useState } from "react";
import { Row, Col, Checkbox, Button } from "antd";

const nonWVRoles = [
  "sydney",
  "rachel",
  "jake",
  "austin",
  "annalise",
  "hannah",
  "daniel",
  "isaac",
  "cat",
  "lucas",
  "josh"
];

const allValues = ["wv0", "wv1", "wv2"].concat(nonWVRoles);

const RolesForm = ({ onSubmit }) => {
  const [roles, setRoles] = useState(nonWVRoles);
  const [wvCount, setWVCount] = useState(3);

  const isWV = (role) => {
    switch(role) {
      case "wv0":
      case "wv1":
      case "wv2":
        return true;
      default:
        return false;
    }
  };

  const getCheckboxes = () => {
    return allValues
    .map((role, i) => (
      <Col style={{ textAlign: "left" }} span={8} key={i}>
        <Checkbox value={role}>{isWV(role) ? "WV" : role}</Checkbox>
      </Col>));
  };

  const onGroupChange = (checkedRoles) => {
    const newRoles = [];
    let newWVCount = 0;
    checkedRoles.forEach((role) => {
      if(isWV(role)) newWVCount++;
      else newRoles.push(role);
    });
    console.log(newRoles, newWVCount);

    setRoles(newRoles);
    setWVCount(newWVCount);
  };

  return (
    <div>
      <h4 style={{ margin: 0 }}>Select roles</h4>
      <Checkbox.Group defaultValue={allValues} onChange={onGroupChange}>
        <Row gutter={[0, 8]} style={{ padding: "0 0.5rem" }} >
          {getCheckboxes()}
        </Row>
      </Checkbox.Group>
      <Button onClick={() => onSubmit(roles, wvCount)}>Set roles</Button>
    </div>
    );
};

export default RolesForm;
