import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import selectNext from '@data-driven-forms/common/src/wizard/select-next';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import { Button } from 'semantic-ui-react';

const NextButton = ({ nextStep, valid, handleNext, nextLabel, getState, handleSubmit, submitLabel }) => (
  <Button
    disabled={!valid || getState().validating || getState().submitting}
    onClick={() => (nextStep ? handleNext(selectNext(nextStep, getState)) : handleSubmit())}
  >
    {nextStep ? nextLabel : submitLabel}
  </Button>
);

NextButton.propTypes = {
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.node.isRequired,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.node.isRequired,
  getState: PropTypes.func.isRequired
};

const WizardStepButtons = ({ buttons: Buttons, ...props }) => {
  if (Buttons) {
    return <Buttons {...props} />;
  }

  const {
    disableBack,
    handlePrev,
    nextStep,
    handleNext,
    buttonLabels: { cancel, submit, back, next },
    formOptions,
    ButtonContainerProps
  } = props;

  return (
    <div container direction="row" justify="space-evenly" {...ButtonContainerProps}>
      <FormSpy subscription={{ valid: true, validating: true, submitting: true }}>
        {() => (
          <React.Fragment>
            <div>
              <Button onClick={formOptions.onCancel}>{cancel}</Button>
            </div>
            <div>
              <Button disabled={disableBack} onClick={handlePrev}>
                {back}
              </Button>
              <NextButton {...formOptions} handleNext={handleNext} nextStep={nextStep} nextLabel={next} submitLabel={submit} />
            </div>
          </React.Fragment>
        )}
      </FormSpy>
    </div>
  );
};

WizardStepButtons.propTypes = {
  ButtonContainerProps: PropTypes.object,
  disableBack: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired
    }),
    PropTypes.func
  ]),
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node.isRequired,
    cancel: PropTypes.node.isRequired,
    back: PropTypes.node.isRequired,
    next: PropTypes.node.isRequired
  }).isRequired,
  buttons: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  formOptions: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  })
};

WizardStepButtons.defaultProps = {
  ButtonContainerProps: {}
};

export default WizardStepButtons;
