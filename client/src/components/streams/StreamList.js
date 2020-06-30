import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams }  from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButtons(stream) {
        if(this.props.isSignedIn && this.props.currentUserId === stream.userId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            )
        }
    }


    renderCreateButton() {
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>Stream List</h2>
                <div className="ui celled list">
                    {this.props.streams.map(stream => {
                        return (
                            <div className="item" key={stream.id}>
                                {this.renderAdminButtons(stream)}
                                <i className="large middle aligned icon camera" />
                                <div className="content">
                                    <Link to={`/streams/${stream.id}`} className="header">
                                        {stream.title}
                                    </Link>
                                    <div className="description">{stream.description}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {this.renderCreateButton()}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    //turn stream object back to array, because it's easier to map over the array
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);