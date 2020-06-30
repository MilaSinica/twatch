import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream }  from '../../actions';

class StreamDelete extends React.Component{
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    goBack = () => history.push('/');

    onDeleteStream = () => {
        this.props.deleteStream(this.props.match.params.id);
    };

    render() {
        return (
            <Modal onOutsideClick={this.goBack}>
                <div className="header">Delete Stream</div>
                {this.props.stream &&<div className="content">Are you sure you want to delete "{this.props.stream.title}" stream?</div>}
                <div className="actions">
                    <button className="ui button" onClick={this.goBack}>Cancel</button>
                    <button className="ui button negative" onClick={this.onDeleteStream}>Delete</button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    //turn stream object back to array, because it's easier to map over the array
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
