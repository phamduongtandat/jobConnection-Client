import { ConfirmModalContextProvider } from './ConfirmModalContextProvider';

function ContextProvider(props) {
  return <ConfirmModalContextProvider>{props.children}</ConfirmModalContextProvider>;
}

export default ContextProvider;
