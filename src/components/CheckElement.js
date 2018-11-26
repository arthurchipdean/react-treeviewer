import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

class CheckElement extends PureComponent {

  render() {
    const { props } = this;
    return (
      <input
        data-id={props.id}
        type="checkbox"
        onChange={props.onCheck}
        checked={props.checked}
      />
    );
  }
}
CheckElement.propTypes = {
  id: PropTypes.number,
  onCheck: PropTypes.func,
  checked: PropTypes.bool
};
export default CheckElement;