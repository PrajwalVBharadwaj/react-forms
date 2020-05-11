import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import MultipleChoiceList from '../common/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const SingleCheckbox = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, label, helperText, description, validateOnMount, meta, ...rest } = useFieldApi({
    ...props,
    type: 'checkbox'
  });
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={helperText}>
      <Form.Checkbox
        {...input}
        required={isRequired}
        onChange={(_event, data) => {
          input.onChange({ target: data, type: 'checkbox' });
        }}
        disabled={isDisabled || isReadOnly}
        {...rest}
        label={label}
        error={
          invalid && {
            content: meta.error,
            pointing: 'left'
          }
        }
      />
    </FormFieldGrid>
  );
};

SingleCheckbox.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  description: PropTypes.node,
  validateOnMount: PropTypes.bool
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.array
};

export default Checkbox;
