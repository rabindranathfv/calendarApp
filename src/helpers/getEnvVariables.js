export const getEnvVariables = () => {
  // comment because VITE STILL HAVE THE ISSUE
  // import.meta.env

  return {
    // ...import.meta.env
    VITE_MODE: import.meta.env.VITE_MODE,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };
};
