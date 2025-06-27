import React from 'react';

interface ErrorProps {
  error: any
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  const statusCode = error?.response?.status;
  const message =
    error?.response?.data?.message || error?.message || 'An error occurred';

  return (
    <div className="w-3/4 max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-lg flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        {statusCode || 'Error'}
      </h1>
      <p className="text-gray-700 text-base">{message}</p>
    </div>
  );
};

export default Error;
