import { Helmet } from 'react-helmet-async';

import { AuthView } from 'src/sections/auth';

export default function AuthPage() {
  return (
    <>
      <Helmet>
        <title> Auth </title>
      </Helmet>
      <AuthView />
    </>
  );
}
