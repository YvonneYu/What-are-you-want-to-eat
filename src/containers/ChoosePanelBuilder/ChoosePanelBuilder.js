import React, { Component } from 'react';
import ChoosePanel from '../../components/ChoosePanel/ChoosePanel';
import './ChoosePanelBuilder.scss';
import * as actions from "../../actions/actions";
import {connect} from "react-redux";

class choosePanelBuilder extends Component {

  onChoiceSelectorChange = (targetType, targetIndex) => {
    const newChoices = this.props.choices.map((choice) => {
        // find target choice by type
        if ( choice.type === targetType ) {
            // update data by targetIndex, if not target, return original value
            let newChoiceData = choice.data.map( (value, i) => {
                return targetIndex !== i ? value: {...value, checked: !value.checked};
            });
            return {...choice, data: newChoiceData};
        }
      // not target choice, return original one
      return choice;
    });
    this.props.setChoices(newChoices);
  };

  validateInput = (value, rules) => {
    let isValid = true;
    // trim empty space
    let trimValue = value.trim();
    // 檢查是否 required
    if (rules.isRequired) {
        isValid = trimValue !== '';
    }
    // 簡單檢查 tel input 是否是 number
    if (rules.inputProps.type === 'tel') {
        isValid = (!isNaN(parseFloat(trimValue)) && isFinite(trimValue)) || (trimValue === '');
    }
    return isValid;
  };

  isValidToCreate = () => {
    let isAllValid = true;
    for (let type in this.props.restInfo ) {
      isAllValid = this.props.restInfo[type].isValid && isAllValid;
    }
    return isAllValid;
  };

  onInfoChange = (event, inputKey) => {
     let newRestInfo = {...this.props.restInfo};
     let newValue = event.target.value;
     let isValid = this.validateInput(newValue, newRestInfo[inputKey]);
     newRestInfo[inputKey] = { ...newRestInfo[inputKey], value: newValue, isValid: isValid};
     this.props.setRestInfo(newRestInfo);
  };

  getCheckedChoices = () => {
    // get data structure like ['心情', '天氣熱']
    return this.props.choices.reduce( (checkedList, choices) => {
      // concat all for choices type
      return checkedList.concat(choices.data.filter((choice) => {
              // find checked object
              return choice.checked;
          }).reduce((list, obj) => {
            // reduce to one single label
            return obj.label;
          },[]))
    }, []);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.isValidToCreate()) {
      alert('資料有誤！不能新增！');
      return;
    }
    let newRest = {
      name: this.props.restInfo.name.value,
      tel: this.props.restInfo.tel.value,
      address: this.props.restInfo.address.value,
      choices: this.getCheckedChoices()
    };
    this.props.handleCreateRest(newRest);
    this.props.resetChoicesAndRestInfo();
  };

  render() {
    return (
        <div className="main-selector-panel">
          <ChoosePanel
            {...this.props}
            isCreationMode={false}
            onSubmit={this.handleSubmit}
            onInfoChange={ this.onInfoChange }
            onSelectorChange={this.onChoiceSelectorChange}>
          </ChoosePanel>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  choices: state.choicesPanel.choices,
  restInfo: state.choicesPanel.restInfo
});

const mapDispatchToProps = (dispatch) => ({
  handleCreateRest: (rest) => {
    dispatch(actions.addRest(rest))
  },
  setChoices: (choices) => {
    dispatch(actions.setChoices(choices));
  },
  setRestInfo: (restInfo) => {
    dispatch(actions.setRestInputValues(restInfo));
  },
  resetChoicesAndRestInfo: () => {
    dispatch(actions.resetChoices())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(choosePanelBuilder);