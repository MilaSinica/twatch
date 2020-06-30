import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream }  from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component{
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    handleSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if(!this.props.stream) return <div>Loading...</div>
        return (
            <div>
                <h3>Edit a Stream</h3>
                {/* initialValues special redux-form keyword, pass whole stream*/}
                <StreamForm 
                    onSubmit={this.handleSubmit} 
                    initialValues={_.pick(this.props.stream, "title", "description")}
                />
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    //turn stream object back to array, because it's easier to map over the array
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
