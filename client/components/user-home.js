import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchUserCardiomon, fetchPoints } from '../store';

/**
 * COMPONENT
 */
class UserHome extends Component {

  componentDidMount(){
    this.props.loadCardiomon()
    this.props.loadPoints()
  }

  render(){
    const { cardiomon, points, user } = this.props
    return this.props ? (
      <div>
        <h1>My Training Points</h1>
        <h3>{this.props.user.points}</h3>

        <h1>My Cardiomon</h1>
        {
          cardiomon ?
          cardiomon.map(mon => {
            console.log('my mon ', mon)
            return (
              <div key={mon.id} >
              <NavLink className="nav-item" to ={`/users/${user.id}/cardiomon/${mon.id}`}>{mon.name}</NavLink>
              </div>
            )
          })
          : <h2>You do not have any Cardiomon :( </h2>
        }
      </div>
    ) : <h1>Loading....</h1>
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    cardiomon: state.user.userCardiomon,
    points: state.user.points,
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const userId = ownProps.match.params.userId
  console.log('ownPros ', ownProps)
  return {
    loadCardiomon: () => {
      dispatch(fetchUserCardiomon(userId));
    },

    loadPoints: () => {
      dispatch(fetchPoints(userId, ownProps.history));
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
