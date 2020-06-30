import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError = ({error, touched}) => {
        if(error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    // renderInput = (formProps) => <input type="text" {...formProps.input} />
    //input - comes from redux-form
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                {/* add all redux-form input props to our input component */}
                <input type="text" {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }

    //redux-form passes all field values to our onSubmit handler
    onSubmit = formValues => this.props.onSubmit(formValues);

    render() {
        //this.props.handelSubmit - comes from redux-form, pass our callback
        //initialValues object keys must correspond to Field names
        return (
            <form className="ui form error" 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
            >
                <Field name='title' label="Enter Title" component={this.renderInput} />
                <Field name='description' label="Enter Description" component={this.renderInput} />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
} 

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        errors.title = "You must enter a title";
    }
    if(!formValues.description) {
        errors.description = "You must enter a description";
    }
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
