import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const RadioOption = ({ name, option, isDisabled, isReadOnly, ...props }) => {
  const { input } = useFieldApi({ name, type: 'radio', value: option.value });
  return (
    <Form.Radio
      {...input}
      onChange={(_event, data) => {
        input.onChange({ target: data, type: 'radio' });
      }}
      {...props}
      label={option.label}
    />
  );
};

RadioOption.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({ label: PropTypes.node.isRequired, value: PropTypes.any.isRequired }).isRequired,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool
};

const Radio = ({ name, ...props }) => {
  const {
    options,
    isDisabled,
    label,
    isRequired,
    helperText,
    description,
    isReadOnly,
    meta,
    validateOnMount,
    FormFieldGridProps,
    FormControlProps,
    FormLabelProps,
    FormHelperTextProps,
    ...rest
  } = useFieldApi({
    ...props,
    name,
    type: 'radio'
  });
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;
  return (
    <FormFieldGrid>
      <Form.Field>{label}</Form.Field>
      {options.map((option) => (
        <RadioOption key={option.value} name={name} option={option} isDisabled={isDisabled} isReadOnly={isReadOnly} {...rest} />
      ))}
      {(invalid || text) && <div {...FormHelperTextProps}>{invalid || text}</div>}
    </FormFieldGrid>
  );
};

Radio.propTypes = {
  ...wrapperProps,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node
    })
  ),
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.any,
  description: PropTypes.node
};

Radio.defaultProps = {
  options: []
};

export default Radio;
