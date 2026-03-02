import React, {useState} from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token";

function Transfer() {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [result, setResult] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  
  async function handleClick() {
    setIsHidden(true);
    setIsDisabled(true);
    const recipientPrincipal = Principal.fromText(recipientId);
    const amountNumber = Number(amount);
    const resultMes = await token.transfer(recipientPrincipal, amountNumber);
    setResult(resultMes);
    setIsHidden(false);
    setIsDisabled(false);
    setAmount("");
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick}
          disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden} id="transfer-result">{result}</p>
      </div>
    </div>
  );
}

export default Transfer;
