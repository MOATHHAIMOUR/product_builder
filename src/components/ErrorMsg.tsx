interface IProps {
    msg:string
}

const ErrorMsg = ({msg}: IProps) => {
  return <span className="block text-red-500 font-semibold text-sm">{msg}</span>;
};

export default ErrorMsg;