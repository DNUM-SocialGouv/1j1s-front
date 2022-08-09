import classNames from 'classnames';
import React, {
  ForwardedRef,
  useCallback, useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/TextInput/TextInput.module.scss';

function useSynchronizedRef<T>(ref: ForwardedRef<T | null>) {
  const innerRef = useRef<T>(null);
  useImperativeHandle<T | null, T | null>(ref, () => innerRef.current, [
    innerRef,
  ]);
  return innerRef;
}

type InputValue = string | ReadonlyArray<string> | number | undefined;

interface TextInputProps extends React.InputHTMLAttributes<unknown> {
  hint?: string
  label?: string
  necessity?: 'optional' | 'required'
  validation?: (value: InputValue) => string | null | undefined;
}

// eslint-disable-next-line react/display-name
export const TextInput = React.forwardRef<HTMLInputElement | null, TextInputProps>((props: TextInputProps, outerRef) => {
  const {
    className,
    defaultValue,
    hint,
    label,
    necessity,
    onChange,
    value: outerValue,
    validation,
    ...rest
  } = props;
  const ref = useSynchronizedRef(outerRef);
  const [valueState, setValueState] = useState<typeof defaultValue>(defaultValue ?? '');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  useLayoutEffect(function validateInput() {
    if (validation) {
      const error = validation(valueState);
      ref.current?.setCustomValidity(error ?? '');
    }
  }, [validation, valueState, ref]);

  useLayoutEffect(function checkInputValidity() {
    if (ref.current && touched) {
      const isValid = ref.current.checkValidity();
      setError(!isValid ? ref.current.validationMessage : '');
    }
  }, [ref, touched, valueState]);

  useEffect(function onValueChange() {
    setValueState(outerValue || '');
  }, [outerValue]);

  const inputId = useRef(uuidv4());
  const hintId = useRef(uuidv4());
  const errorId = useRef(uuidv4());

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    setValueState(event.target.value);
  }, [onChange]);

  return (
    <div className={classNames(styles.textInput, className)}>
      {label && (
        <label className={styles.textInputLabel} htmlFor={inputId.current}>
          {label}
          {necessity && (
            <span className="text-small"> (champ {necessity === 'required' ? 'obligatoire' : 'optionnel'})</span>
          )}
        </label>
      )}
      <input
        ref={ref}
        {...rest}
        id={inputId.current}
        aria-describedby={hint && hintId.current}
        aria-invalid={!!error}
        aria-errormessage={error && errorId.current}
        className={classNames(styles.textInputField, touched && styles.textInputFieldTouched)}
        onChange={onInputChange}
        onBlur={() => setTouched(true) }
        value={valueState}
      />
      {(error) && (
        <p className={classNames(styles.textInputHint, styles.textInputHintError)} id={errorId.current}>
          {error}
        </p>
      )}
      {(!error && hint) && (
        <p className={classNames(styles.textInputHint)} id={hintId.current}>
          {hint}
        </p>
      )}
    </div>
  );
});
