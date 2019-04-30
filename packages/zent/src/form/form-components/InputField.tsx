import * as React from 'react';
import { Omit } from 'utility-types';

import { FormControl, IFormControlProps } from '../Control';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';
import Input, { IInputProps, IInputChangeEvent } from '../../input';
import { useField, IFormFieldCommonProps, defaultRenderError } from '../shared';

export interface IFormInputFieldProps
  extends Omit<IInputProps, 'onChange' | 'value' | 'name'>,
    IFormControlProps<string> {}

function mapInputEventToValue(
  e: IInputChangeEvent | React.ChangeEvent<HTMLInputElement>
) {
  return e.target.value;
}

export const FormInputField: React.FunctionComponent<
  IFormInputFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [childProps, { error }, ref] = useField(
    props,
    '',
    mapInputEventToValue
  );
  const {
    className,
    style,
    label,
    prefix,
    renderError = defaultRenderError,
    required,
    description,
    notice,
    defaultValue,
    ...otherProps
  } = props;
  return (
    <FormControl
      ref={ref as any}
      className={className}
      style={style}
      label={label}
      prefix={prefix}
      required={required}
      invalid={!!error}
    >
      <Input prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};
