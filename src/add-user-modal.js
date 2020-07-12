import React from "react";
import "./add-user-modal.css";

export class AddUserModal extends React.Component {
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-header">
          <div className="modal-title">Create member</div>
          <div className="modal-close" onClick={this.closeModal}>
            <img className="close-icon" src="/close-gray.svg" alt="Close modal" />
          </div>
        </div>
        <div className="modal-content">
          <div className="modal-form">
            <div className="section-left">
              <div className="input-block">
                <label htmlFor="first-name">First name <span className="required">*</span></label>
                <input className="text-input" type="text" id="first-name" />
              </div>
              <div className="input-block">
                <label htmlFor="last-name">Last name <span className="required">*</span></label>
                <input className="text-input" type="text" id="last-name" />
              </div>
              <div className="checkbox-block">
                <input className="checkbox" type="checkbox" id="user-status" />
                <label htmlFor="user-status">User status</label>
              </div>
              <div className="checkbox-note">
                Designates whether the person can login into application
              </div>
            </div>
            <div className="section-right">
              <div className="input-block">
                <label htmlFor="title">Title</label>
                <input className="text-input" type="text" id="title" />
              </div>
              <div className="input-block">
                <label htmlFor="business-unit">Business Unit</label>
                <input className="text-input" type="text" id="business-unit" />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-controls">
          <div className="cancel-text" onClick={this.closeModal}>Cancel</div>
          <button className="create-member-button">Create Member</button>
        </div>
      </div>
    );
  }

  closeModal = event => {
    this.props.onClose();
  }
}