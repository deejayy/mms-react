import React from "react";
import "./member-set.css";
import { roleList, roleLevelMap } from "./member-set-options";

const DEFAULT_ROLE = 'customer';

export class MemberSet extends React.Component {
  constructor(props) {
    super(props);

    const role = this.props.role || DEFAULT_ROLE;
    this.state = {
      person: this.props.person,
      role: role,
      accessLevel: this.props.accessLevel,
      accessLevels: roleLevelMap[role],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.onChange({
        person_id: this.state.person,
        role: this.state.role,
        access_level: this.state.accessLevel,
      });
    }
  }

  render() {
    return (
      <form className="member-form">
        <div className="member">
          <select className="select member-select" value={this.state.person} onChange={this.handlePersonChange}>
            {
              this.props.personList.map(person => (
                <option key={person.value} value={person.value}>{person.name}</option>
              ))
            }
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
          <select className="select access-level-select" value={this.state.accessLevel} onChange={this.handleAccessLevelChange}>
            {
              this.state.accessLevels.map(accessLevel => (
                <option key={accessLevel.value} value={accessLevel.value}>{accessLevel.name}</option>
              ))
            }
          </select>
        </div>
        <div className="remove" onClick={this.handleRemove}>
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

    if (!roleLevelMap[newRole].some(role => role.value === newRole)) {
      this.changeAccessLevel(roleLevelMap[newRole][0].value);
    }
  }

  handleAccessLevelChange = event => {
    const level = event.target.value;
    this.changeAccessLevel(level);
  }

  changeAccessLevel(newLevel) {
    this.setState({
      accessLevel: newLevel,
    });
  }

  handlePersonChange = event => {
    const person = event.target.value;
    this.changePerson(person);
  }

  changePerson(newPerson) {
    this.setState({
      person: newPerson,
    });
  }

  handleRemove = event => {
    this.props.onRemove(event);
  }
}
