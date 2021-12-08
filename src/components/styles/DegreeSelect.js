import React from "react";
import { render } from "react-dom";
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.cjs";

export default class DegreeSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      multiValue: [],
      filterOptions: [
        {
          value: "MD",
          label: "Doctor of Medicine (MD)"
        },
        {
          value: "DO",
          label: "Doctor of Osteopathic Medicine (DO)"
        },
        {
          value: "Bachelor of Medicine, Surgery (MBBS)",
          label: "Bachelor of Medicine, Surgery (MBBS)"
        },
        {
          value: "Master of Medicine (M. Med)",
          label: "Master of Medicine (M. Med)"
        },
        {
          value: "Doctor of Nursing Practice (DNP)",
          label: "Doctor of Nursing Practice (DNP)"
        },
        {
          value: "Certified Nurse Parctitioner (CNP)",
          label: "Certified Nurse Parctitioner (CNP)"
        }
      ]
    };

    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  handleMultiChange(option) {
    this.setState((state) => {
      return {
        multiValue: this.state.filterOptions.value
      };
    });
  }

  render() {
    return (
      <div>
        <Select
          style={{
            backgroundColor: "white",
            borderRadius: "14px",
            border: "1px solid #C3CAD0",
            padding: "0.5rem",
            ":hover": {
              border: "1px solid #E73D8E",
              borderRadius: "14px 14px 0 0",
            },
            position: "absolute",
            width: "100px",
            height: "50%",
          }}
          name="filters"
          placeholder=""
          value={this.state.multiValue}
          options={this.state.filterOptions}
          onChange={this.handleMultiChange}
          isMulti
        />
      </div>
    );
  }
}

