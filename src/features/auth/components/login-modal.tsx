import clsx from "clsx";
import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const LoginModal = (): JSX.Element => {
  const [state, setState] = useState({
    address: "",
    alturaGuard: "",
    isOpen: false,
  });

  const { isAuthenticated, handleLogin } = useAuthContext();

  useEffect(() => {
    if (state.isOpen === !isAuthenticated) return;
    setState({ ...state, isOpen: !isAuthenticated });
  }, [state, isAuthenticated]);

  const onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event target", event.target.value);
    setState({ ...state, address: event.target.value });
  };

  const onCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event target", event.target.value);
    setState({ ...state, alturaGuard: event.target.value });
  };

  const handleLoginEvent = () => {
    handleLogin?.(state.address, state.alturaGuard);
  };

  return (
    <div
      className={clsx("modal", { "modal-open": state.isOpen })}
      id="login-modal"
    >
      <div className="modal-box">
        <h3 className="mb-5 text-lg font-bold">Login</h3>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Wallet Address"
            name="address"
            className="input-bordered input mb-5 w-full"
            value={state.address}
            onChange={onAddressChange}
          />
          <input
            type="text"
            className="input-bordered input w-full"
            name="alturaGuard"
            placeholder="altura guard code"
            value={state.alturaGuard}
            onChange={onCodeChange}
          />
        </div>
        <div className="modal-action">
          <a href="#" className="btn" onClick={handleLoginEvent}>
            Submit
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
