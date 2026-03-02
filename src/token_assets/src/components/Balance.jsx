import React, {useState} from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token";

function Balance() {
  const [inputPrincipal, setInputPrincipal] = useState("");
  const [balance, setBalance] = useState("");
  const [tokenCurrency, setTokenCurrency] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  // const tokenCurrency = await token.getSymbol;
  
  async function handleClick() {
    // console.log("Input:", inputPrincipal);
    // console.log("Token Actor Object:", token);
    const principal = Principal.fromText(inputPrincipal);
    const balance = await token.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setTokenCurrency(await token.getSymbol());
    setIsHidden(false);
}


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputPrincipal}
          onChange={(e) => setInputPrincipal(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balance} {tokenCurrency}</p>
    </div>
  );
}

export default Balance;
