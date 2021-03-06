"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

var initialState = {
  reviewMap: {},
  searchResults: [] };

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);
  var updatedMap = Object.assign({}, updatedState.reviewMap);

  switch (action.type) {

    case constants.REVIEWS_RECEIVED:
      // console.log("REVIEWS_RECEIVED " + JSON.stringify(action.reviews))
      var keys = Object.keys(action.params);
      var key = keys[0];
      var value = action.params[key];
      var array = updatedMap[value] ? updatedMap[value] : [];

      action.reviews.forEach(function (review, i) {
        array.push(review);
      });
      updatedMap[value] = array;
      updatedState.reviewMap = updatedMap;

      return updatedState;

    case constants.REVIEW_UPDATED:
      // console.log('REVIEW_UPDATED: ' + JSON.stringify(action.review))
      var list = updatedMap[action.review.hikeId];
      var newList = [];
      list.forEach(function (review, i) {
        if (review.id == action.review.id) {
          newList.push(action.review);
        } else {
          newList.push(review);
        }
      });

      updatedMap[action.review.hikeId] = newList;
      updatedState.reviewMap = updatedMap;
      return updatedState;

    case constants.REVIEWS_SEARCHED:
      console.log("REVIEWS_SEARCHED " + JSON.stringify(action.reviews));
      updatedState.searchResults = action.reviews;
      return updatedState;

    default:
      return state;
  }
};