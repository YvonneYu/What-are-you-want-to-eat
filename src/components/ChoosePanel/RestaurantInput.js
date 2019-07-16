import React from 'react';
import './ChoosePanel.scss';

const restaurantInput = (props) => {
  let labelName = 'res_' + props.id;
  return (
    <div className="cell">
      <label htmlFor={ labelName }>{ props.label } { props.isValid ? null : <span className="form-error"> { props.inputProps.errorMessage } </span> } </label>
      <input type={ props.inputProps.type } name={ labelName } id={ labelName } value={ props.value }
             onChange={ (event) => props.onChange(event, props.id) }
             placeholder={props.inputProps.placeholder} />
    </div>
   )
};

export default restaurantInput;