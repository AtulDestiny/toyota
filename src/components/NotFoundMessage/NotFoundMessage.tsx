// src/components/NotFoundMessage/NotFoundMessage.tsx
"use client";

import React from "react";
import Link from "next/link";

interface NotFoundMessageProps {
  message: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const NotFoundMessage: React.FC<NotFoundMessageProps> = ({
  message,
  buttonText,
  buttonUrl,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Puesto no encontrado</h2>
      <p className="text-lg mb-8">{message}</p>
      {buttonText && buttonUrl && (
        <Link
          href={buttonUrl}
          className="px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default NotFoundMessage;
