import React from 'react';
import PropTypes from 'prop-types';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { Form } from 'semantic-ui-react';
import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const Switch = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta, onText, offText, ...rest } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;

  return (
    <FormFieldGrid>
      <Form.Checkbox
        toggle
        label={label}
        {...input}
        onChange={(event, data) => {
          console.log(data);
          input.onChange({ target: data });
        }}
      />
    </FormFieldGrid>
  );
};

Switch.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  onText: PropTypes.node,
  offText: PropTypes.node,
  description: PropTypes.node
};

export default Switch;