import { Container } from "@mui/material";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return <Container sx={{ py: 3 }}>{children}</Container>;
}
