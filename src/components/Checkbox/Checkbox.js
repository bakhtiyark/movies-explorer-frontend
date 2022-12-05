import "./Checkbox.css"

export default function Checkbox({state, onChange}) {
  return (
    <div className="search__toggler">
      <label className="switch">
        <input
          type="checkbox"
          onChange={onChange}
          value={state}
          required
        />
        <span className="slider round"></span>
      </label>
      <p className="search__toggler-text">Короткометражки</p>
    </div>
  );
}
