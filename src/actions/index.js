import constants from '../constants'
import { APIManager } from '../utils'

export default {

/* ======================== General =================================== */

    displayMessage: (message) => {
      return {
        type: constants.MESSAGE_RECEIVED,
        message: message,
      }
    },

    displayError: (message) => {
      return {
        type: constants.ERROR_RECEIVED,
        message: message
      }
    },

/* ======================== User data ================================= */

  // Log user in
  currentUserReceived: (credentials) => {
    return (dispatch) => {
      APIManager.post('/account/login', credentials, (err, response) => {
        if (err) {
          let msg = err.message || err
          console.error(msg)
          dispatch({
            type: constants.ERROR_RECEIVED,
            message: msg
          })
          return
        }
        const user = response.profile
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: user
        })
      })
    }
	},

  // Get a profile for other users to see
  fetchProfile: (id) => {
    return (dispatch) => {
      const endpoint = '/api/profile/' + id
      APIManager.get(endpoint, null, (err, response) => {
        if (err) {
          console.error(err)
          return
        }
        if (response.result.length == 0 ) {
          console.error('Profile not found')
          return
        }
        const profile = response.result
        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: profile
        })
      })
    }
  },

  // Log user out
  logoutUser: (user) => {
    return (dispatch) => {
      APIManager.get('/account/logout', null, (err, response) => {
        if (err) {
          console.error(err.message)
          return
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: null
        })
      })
    }
  },

  // Create new profile
  profileCreated: (profile) => {
    return (dispatch) => {
      APIManager.post('/account/register', profile, (err, response) => {
        if (err) {
          // let msg = err.message || err
          console.error(err)
          return
        }
        const user = response.profile

        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: user
        })
      })
    }
  },

  // Update Profile
  profileUpdated: (user, profile) => {
    return (dispatch) => {
      const endpoint = '/api/profile/' + user.id
      APIManager.put(endpoint, profile, (err, response) => {
        if (err) {
          console.log(err)
          return
        }
        const user = response.result
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: user
        })
      })
    }
  },


/* ======================== Hike and Map data ============================== */
  currentHikeReceived: (hike) => {
    return {
      type: constants.CURRENT_HIKE_RECEIVED,
      hike: hike,
    }
  },

  // Get hikes to display on map
  fetchHikes: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        reducer: 'map',
        status: 'loading'
      })

      APIManager.get('/api/hike', params, (err, response) => {
        if (err) {
          console.error(err)
          return
        }
        const hikes = response.results

        dispatch({
          type: constants.HIKES_RECEIVED,
          hikes: hikes
        })
      })
    }
  },

  // Create a new hike
  hikeCreated: (hike) => {
    return (dispatch) => {
      APIManager.post('/api/hike', hike, (err, response) => {
        if (err) {
          console.error('ERROR: ' + err.message)
        }
        const newHike = response.result

        dispatch({
          type: constants.HIKE_ADDED,
          hike: newHike
        })
      })
    }
  },

  // Select a hike
  hikeSelected: (id) => {
    let hike = id.toString()
    let endpoint = '/api/hike/' + hike
    return (dispatch) => {
      // GET hike details
      APIManager.get(endpoint, null, (err, response) => {
        if (err) {
          console.error('ERROR: ' + err.message)
        }
        const selectedHike = response.result

        dispatch({
          type: constants.CURRENT_HIKE_RECEIVED,
          currentHike: selectedHike
        })
      })
    }
  },

  // Get user location (for using current location as hike location)
  userLocationReceived: (position) => {
    return {
      type: constants.USER_LOCATION_RECEIVED,
      position: position
    }
  },

  // Mark hike location on map
  markHikeLocation: (location) => {
    return {
      type: constants.MARK_HIKE_LOCATION,
      location: location
    }
  },

/* ====================== Review Data ====================================== */

  // Get reviews for a specific hike
  fetchReviews: (params) => {
    return (dispatch) => {
      APIManager.get('/api/review', params, (err, response) => {
        if (err) {
          console.error(err)
          return
        }
        const reviews = response.results
        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: reviews
        })
      })
    }
  },

  // Allow user to add new review to a hike
  reviewCreated: (review, params) => {
    return (dispatch) => {
      APIManager.post('/api/review', review, (err, response) => {
        if (err) {
          console.error('Error: ' + err.message)
        }
        const reviews = [response.result]

        dispatch({
          type: constants.REVIEWS_RECEIVED,
          params: params,
          reviews: reviews
        })
      })
    }
  },

  // Update a user's review of a hike
  reviewUpdated: (review) => {
    return (dispatch) => {
      const endpoint = '/api/review/' + review.id
      APIManager.put(endpoint, review, (err, response) => {
        if (err) {
          console.error(err)
          return
        }
        const updatedReview = response.result
        dispatch({
          type: constants.REVIEW_UPDATED,
          review: updatedReview
        })
      })
    }
  },

}
