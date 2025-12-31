export const formatApiError = (error: any) => {
  const data = error?.response?.data;

  const formattedErrors: Record<string, string> = {};

  if (Array.isArray(data?.errors)) {
    data.errors.forEach((errObj: Record<string, string>) => {
      Object.entries(errObj).forEach(([field, message]) => {
        formattedErrors[field] = message;
      });
    });
  }

  return {
    message: data?.message || "Something went wrong",
    errors: formattedErrors,
  };
};
