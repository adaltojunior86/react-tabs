function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { Children, cloneElement } from 'react';
import { isTabPanel, isTab, isTabList } from '../helpers/elementTypes';

function isTabChild(child) {
  return isTab(child) || isTabList(child) || isTabPanel(child);
}

export function deepMap(children, callback) {
  return Children.map(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return null;

    if (isTabChild(child)) {
      return callback(child);
    }

    if (child.props && child.props.children && _typeof(child.props.children) === 'object') {
      // Clone the child that has children and map them too
      return cloneElement(child, _extends({}, child.props, {
        children: deepMap(child.props.children, callback)
      }));
    }

    return child;
  });
}
export function deepForEach(children, callback) {
  return Children.forEach(children, function (child) {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) return;

    if (isTab(child) || isTabPanel(child)) {
      callback(child);
    } else if (child.props && child.props.children && _typeof(child.props.children) === 'object') {
      if (isTabList(child)) callback(child);
      deepForEach(child.props.children, callback);
    }
  });
}