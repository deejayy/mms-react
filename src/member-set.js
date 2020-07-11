import React from "react";
import "./member-set.css";

export class MemberSet extends React.Component {
  render() {
    return (
      <form className="member-form">
        <div className="member">
          <select className="select member-select">
          </select>
        </div>
        <div className="role">
          <select className="select role-select">
          </select>
        </div>
        <div className="access-level">
          <select className="select access-level-select">
          </select>
        </div>
        <div className="remove">
          <img className="remove-icon" src="/close-blue.svg" alt="Remove user" />
        </div>
      </form>
    )
  }
}
