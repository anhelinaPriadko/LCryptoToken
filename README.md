LToken (LNT) 🪙
A decentralized token and management platform built on the Internet Computer Protocol (ICP). This project demonstrates a full-stack Web3 application, including custom token logic, secure authentication, and data persistence.

🛠 Tech Stack
Backend: Motoko (Actor Model & Stable Memory)

Frontend: React.js

Authentication: Internet Identity (II)

Environment: WSL (Ubuntu) + DFX SDK

✨ Key Features
Token Operations: Check the balance of any Principal ID and perform secure transfers of LToken.

Authenticated Faucet: Users can claim 10,000 LTokens once. The identity is verified via Internet Identity to prevent double-claiming.

Data Persistence: Your balances are safe! I've implemented system hooks to ensure data survives canister upgrades.

💾 How Data Persistence Works
Unlike standard variables that clear during an update, LToken uses specialized hooks to migrate data:

preupgrade(): Just before an update, the HashMap containing all balances is converted into a stable array.

postupgrade(): Immediately after the new code is deployed, the system restores the HashMap from that stable array.
This ensures that your users don't lose their tokens when you fix a bug or add a new feature.

🚀 Getting Started
If you want to run this project or continue development, follow these steps in your WSL terminal:

1. Start the Local Network
This boots up the local Internet Computer environment.

Bash
dfx start --background --clean
Note: Use --clean if you want a fresh start, or omit it to keep existing data.

2. Install Dependencies
Bash
npm install
3. Deploy Canisters
This compiles the Motoko code and deploys the token, token_assets, and internet_identity canisters.

Bash
dfx deploy
4. Run the Frontend
Bash
npm start
The app will typically be available at http://localhost:8080 (or the port specified in your terminal).

🔑 Local Development Note
When testing the Internet Identity login locally, ensure the identityProvider URL in index.jsx matches the ID of your locally deployed internet_identity canister (e.g., http://<canister_id>.localhost:8000/#authorize).