import React, {Component, PropTypes} from 'react';
import ItemDetails from '../components/ItemDetails'
import Navbar from '../components/Navbar'
import {connect} from 'react-redux'
import {fetchPostIfNeeded} from '../actions/actions'


class App extends Component {

    constructor(props) {
        super(props);
        this.items = [];
        this.pages = 0;
    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchPostIfNeeded())
    }


    componentWillReceiveProps(nextProps) {
        this.items = nextProps.items;
    }


    render() {
        return (
            <div>
                <ItemDetails obj={this.items}/>
                <Navbar obj={this.items.page} dispatchFunc={this.props.dispatch}/>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {postsReducer} = state;
    const defaultObj = {
        isFetching: ('isFetching' in postsReducer) ? postsReducer.isFetching : true,
        items: postsReducer.items || [],
    }
    return defaultObj
}

export default connect(mapStateToProps)(App)
