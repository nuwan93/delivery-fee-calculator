import type { ComponentPropsWithoutRef } from "react";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  testId: string;
  id: string;
}

const InputField = ({ label, testId, id, ...rest }: InputFieldProps) => (
  <>
    <label htmlFor={id} className="text-xl">
      {label}
    </label>
    <input
      {...rest}
      id={id}
      data-test-id={testId}
      className="border-r-4 border-4 rounded-lg w-full p-3  focus:outline-none"
    />
  </>
);

export default InputField;
