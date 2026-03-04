import React, {useState} from "react";
// 1. Імпортуємо просто token
import { token } from "../../../declarations/token"; 

function Faucet() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);

    // 2. Видаляємо AuthClient та створення identity
    // Замість створення нового актора використовуємо глобальний token
    try {
        const payoutResult = await token.payOut(); 
        setButtonText(payoutResult);
    } catch (error) {
        console.error("Faucet error:", error);
        setButtonText("Error");
        setIsDisabled(false);
    }
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">🚰</span>
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