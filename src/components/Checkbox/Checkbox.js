import { useState } from "react";
import "./Checkbox.css"

export default function Checkbox({state, onChange}) {
  const [checked, setChecked] = useState(localStorage.getItem("checkbox"));
  return (
    <div className="search__toggler">
      <label className="switch">
        <input
          type="checkbox"
          name="checkbox"
          onChange={onChange}
          value={state}
        />
        <span className="slider round"></span>
      </label>
      <p className="search__toggler-text">Короткометражки</p>
    </div>
  );
}
