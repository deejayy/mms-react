import React from "react";
import "./member-set.css";
import { roleList, roleLevelMap } from "./member-set-options";

const DEFAULT_ROLE = 'customer';

export class MemberSet extends React.Component {
  constructor(props) {
    super(props);

    const role = this.props.role || DEFAULT_ROLE;
    this.state = {
      role: role,
      accessLevels: roleLevelMap[role],
    };
  }

  render() {
    return (
      <form className="member-form">
        <div className="member">
          <select className="select member-select">
          </select>
        </div>
        <div className="role">
          <select className="select role-select" value={this.state.role} onChange={this.handleRoleChange}>
            {
              roleList.map(role => (
                <option key={role.value} value={role.value}>{role.name}</option>
              ))
            }
          </select>
        </div>
        <div className="access-level">
          <select className="select access-level-select">
            {
              this.state.accessLevels.map(accessLevel => (
                <option key={accessLevel.value} value={accessLevel.value}>{accessLevel.name}</option>
              ))
            }
          </select>
        </div>
        <div className="remove">
          <img className="remove-icon" src="/close-blue.svg" alt="Remove user" />
        </div>
      </form>
    )
  }

  handleRoleChange = event => {
    const role = event.target.value;
    this.changeRole(role);
  }

  changeRole(newRole) {
    this.setState({
      role: newRole,
      accessLevels: roleLevelMap[newRole],
    });
  }
}
