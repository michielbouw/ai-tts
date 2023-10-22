export const mapAuthCallbackErrorToReadableError = (callbackError: string) => {
  switch (callbackError) {
    case 'OAuthCallbackError':
      return 'Something went wrong trying to sign in with the OAuth provider, please try again!';
    case 'EmailSignin':
    case 'CredentialsSignin':
      return 'Invalid email or password, please try again!';
    case 'Missing email or password':
    case 'Passwords do not match':
      return callbackError;
    default:
      return `Something unexpected happened, please try again! (technical details: "${callbackError}")`;
  }
};
