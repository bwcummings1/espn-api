'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const ClientErrorBoundary = ({ children, fallback }) => (
  <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
);

export default ClientErrorBoundary;