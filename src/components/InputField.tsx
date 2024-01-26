import type { ComponentPropsWithoutRef } from "react";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  testId: string;
}

const InputField = ({ label, testId, ...rest }: InputFieldProps) => (
  <>
    <label className="text-xl">{label} </label>
    <input
      {...rest}
      data-test-id={testId}
      className="  border rounded-lg w-full p-3  focus:outline-none"
    />
  </>
);

export default InputField;
