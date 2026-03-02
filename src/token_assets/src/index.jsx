import ReactDOM from 'react-dom';
import React from 'react';
import App from "./components/App";
import { AuthClient } from '@dfinity/auth-client';

const init = async () => {
  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    await renderApp(authClient);
  } else {
    await authClient.login({
      identityProvider: "http://umunu-kh777-77774-qaaca-cai.localhost:8000/#authorize",
      onSuccess: () => {
        renderApp(authClient);
      },
    });
  }
};

async function renderApp(authClient) {
  ReactDOM.render(<App authClient={authClient} />, document.getElementById("root"));
}

init();


