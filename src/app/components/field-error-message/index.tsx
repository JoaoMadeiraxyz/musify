type FieldErrorMessageProps = {
  message: string | undefined;
};

export function FieldErrorMessage({ message }: FieldErrorMessageProps) {
  return <p className="text-red-500">{message}</p>;
}
