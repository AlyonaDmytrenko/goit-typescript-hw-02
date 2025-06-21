interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = "Error fetching photos" }) => {
  return <p>{message}</p>;
};

export default ErrorMessage;
