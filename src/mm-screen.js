import React from "react";
import "./mm-screen.css";
import { MemberSet } from "./member-set";
import { mmScreenResponse } from './mock-backend-response';
import { initialMemberSettings } from './mock-member-setting';

export class MmScreen extends React.Component {
  backendResponse = mmScreenResponse;
  memberSettings = initialMemberSettings;

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
            <div className="table-row">
              <MemberSet />
            </div>
            <div className="footnote">
              <button className="add-new-setting link-button" href="#">Add new member</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
