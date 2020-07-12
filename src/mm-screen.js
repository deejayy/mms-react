import React from "react";
import "./mm-screen.css";
import { MemberSet } from "./member-set";
import { initialMemberSettings } from './mock-member-setting';
import { mmScreenResponse } from './mock-backend-response';

const DEFAULT_ROLE = 'customer';
const DEFAULT_ACCESS_LEVEL = 'read';

export class MmScreen extends React.Component {
  state = {
    backendResponse: [],
    memberSettings: initialMemberSettings,
    changed: false,
    memberRemained: false,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.memberSettings !== this.state.memberSettings) {
      this.setState({ changed: true });
    }
    if (prevState.backendResponse !== this.state.backendResponse || prevState.memberSettings !== this.state.memberSettings) {
      this.setState({ memberRemained: this.remainingPersonList().length > 0 });
    }
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    fetch("/mock-data.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loading: false,
            backendResponse: this.parseBackendResponse(result),
          });
        },
        (error) => {
          this.setState({
            backendResponse: [],
            loading: false,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div className="mmscreen">
        <div className={"mmscreen-header " + (this.state.changed ? "changed" : "")}>
          <div className="name">Csaba SZELL</div>
          <div className="controls">
            <button className="new-member">New member</button>
            {
              this.state.changed
              ? (<button className="save-changes-button" onClick={this.handleSave}>Save Changes</button>)
              : ('')
            }
          </div>
        </div>

        <div className="members">
          {
            this.state.error
            ? (
                <div class="error">
                  Can't load user list!
                </div>
              )
            : (
                <div className="table">
                  <div className="table-header">
                    <div className="member">Member</div>
                    <div className="role">Role</div>
                    <div className="access-level">Access Level</div>
                  </div>
                  {
                    this.state.memberSettings.map((setting, index) => {
                      return (
                        <div className="table-row" key={setting.person_id}>
                          <MemberSet
                            person={setting.person_id}
                            personList={this.getPersonList(index)}
                            role={setting.role}
                            accessLevel={setting.access_level}
                            onChange={(event) => this.handleChange(event, index)}
                            onRemove={() => this.handleRemove(index)}
                          />
                        </div>
                      )
                    })
                  }
                  <div className="footnote">
                    <button
                      className={"add-new-setting link-button " + (!this.state.memberRemained ? "disabled" : "")}
                      onClick={this.addMember}
                      disabled={!this.state.memberRemained}
                    >Add new member</button>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    );
  }

  parseBackendResponse(response) {
    // return mmScreenResponse; // if we want to stick to the frontend mock
    return response;
  }

  remainingPersonList(keepPersonId) {
    return this.state.backendResponse
      ? this.state.backendResponse.filter(person => {
        return !this.state.memberSettings.map(setting => setting.person_id).includes(person.person_id)
          || (keepPersonId && keepPersonId === person.person_id)
        })
      : [];
  }

  getPersonList(index) {
    return this.remainingPersonList(this.state.memberSettings[index].person_id).map(person => ({
      name: `${person.firstname} ${person.lastname}`,
      value: person.person_id,
    }));
  }

  handleChange(setting, index) {
    const memberSettings = this.state.memberSettings.slice();
    memberSettings[index] = setting;
    this.setState({ memberSettings });
  }

  getNextPersonId() {
    const remainingList = this.remainingPersonList();
    if (remainingList.length > 0) {
      const [ person ] = remainingList;
      return person.person_id;
    }
  }

  getNextPerson() {
    const newPersonId = this.getNextPersonId();
    if (newPersonId) {
      return {
        person_id: newPersonId,
        role: DEFAULT_ROLE,
        access_level: DEFAULT_ACCESS_LEVEL,
      };
    }
  }

  addMember = event => {
    const nextPerson = this.getNextPerson();
    if (nextPerson) {
      this.setState({ memberSettings: [ ...this.state.memberSettings, nextPerson ] });
      this.handleChange(nextPerson, this.state.memberSettings.length);
    }
  }

  handleRemove(index) {
    const memberSettings = this.state.memberSettings.filter((_, memberIndex) => memberIndex !== index);
    this.setState({ memberSettings });
  }

  handleSave = event => {
    console.log(this.state.memberSettings);
    alert('Payload has been written to console for now');
  }
}
