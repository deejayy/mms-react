import React from "react";
import "./mm-screen.css";
import { MemberSet } from "./member-set";
import { mmScreenResponse } from './mock-backend-response';
import { initialMemberSettings } from './mock-member-setting';

export class MmScreen extends React.Component {
  backendResponse = mmScreenResponse;
  state = {
    memberSettings: initialMemberSettings,
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="mmscreen">
        <div className="mmscreen-header">
          <div className="name">Csaba SZELL</div>
          <div className="controls">
            <button className="new-member">New member</button>
            <button className="save-changes-button">Save Changes</button>
          </div>
        </div>

        <div className="members">
          <div className="table">
            <div className="table-header">
              <div className="member">Member</div>
              <div className="role">Role</div>
              <div className="access-level">Access Level</div>
            </div>
            {
              this.state.memberSettings.map((setting, index) => {
                return (
                  <div className="table-row" key={index}>
                    <MemberSet
                      person={setting.person_id}
                      personList={this.getPersonList(index)}
                      role={setting.role}
                      accessLevel={setting.access_level}
                      onChange={(event) => this.handleChange(event, index)}
                    />
                  </div>
                )
              })
            }
            <div className="footnote">
              <button className="add-new-setting link-button" href="#">Add new member</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getPersonList(index) {
    return this.backendResponse.filter(person => {
      return !this.state.memberSettings.map(setting => setting.person_id).includes(person.person_id)
        || this.state.memberSettings[index].person_id === person.person_id;
    }).map(person => ({
      name: `${person.firstname} ${person.lastname}`,
      value: person.person_id,
    }));
  }

  handleChange(event, index) {
    const newSettings = this.state.memberSettings.slice();
    newSettings[index] = event;
    this.setState({
      memberSettings: newSettings,
    });
  }
}
