import React, { Component } from 'react';
import _ from 'underscore';

const FormHandle = (Wrapper) => {
  class WrapperComponent extends Component {

    componentWillMount() {
      if (!_.isEmpty(this.props.fieldErrors)) {
        this.handleError(this.props.fieldErrors);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!_.isEqual(this.props.fieldErrors, nextProps.fieldErrors)) {
        this.handleError(nextProps.fieldErrors, nextProps.form.getFieldsValue());
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields(
        { force: true },
        (err, values) => {
          if (!err) {
            this.props.onSubmit(values);
          }
        },
      );
    }

    handleError(errors, fields) {
      let fieldErrors = _.mapObject(
        errors,
        (item, key) => ({
          errors: [item],
        }),
      );

      if (fields) {
        let fieldsReset = _.mapObject(fields,
         (item, key) => {
           const errors = fieldErrors[key] ? fieldErrors[key].errors : false;
           if (errors) {
             return {
               errors,
             };
           }
           return {};
         },
       );
        this.props.form.setFields(fieldsReset);
      } else {
        this.props.form.setFields(fieldErrors);
      }
    }

    handleDownload = (e) => {
      this.props.form.validateFields(
        { force: true },
        (err, values) => {
          if (!err) {
            this.props.download(values);
          }
        },
      );
    }

    render() {
      const error = this.props.fieldErrors;
      return (<Wrapper
        {...this.props}
        handleSubmit={this.handleSubmit}
        handleDownload={this.handleDownload}
      />);
    }
  }

  return WrapperComponent;
};

export default FormHandle;
