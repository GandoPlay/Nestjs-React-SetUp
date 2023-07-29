import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React from "react";

interface FormFileProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFileProps> = ({
  error,
  children,
  label,
}) => {
  return (
    <FormControl  isInvalid={Boolean(error)}>
      <FormLabel textAlign={'center'}>{label}</FormLabel>
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};