import React, {useState} from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedActor = createActor(canisterId, { agentOptions: { identity } });
    const payoutResult = await authenticatedActor.payOut();
    setButtonText(payoutResult);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        disabled={isDisabled}
        onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
