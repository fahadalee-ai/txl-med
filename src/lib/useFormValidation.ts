import { useState } from "react";

export function useFormValidation<T extends Record<string, string | boolean>>(
  initial: T,
  validate: (values: T) => Partial<Record<keyof T, string>>,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  function set<K extends keyof T>(key: K, value: T[K]) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (touched[key]) {
        const nextErrors = validate(next);
        setErrors((e) => ({ ...e, [key]: nextErrors[key] }));
      }
      return next;
    });
  }

  function touch<K extends keyof T>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validate(values)[key] }));
  }

  function submit() {
    const next = validate(values);
    setErrors(next);
    setTouched(
      Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>,
      ),
    );
    return Object.values(next).every((msg) => !msg);
  }

  return { values, errors, touched, set, touch, submit, setValues, setErrors };
}
