import { Box, Typography } from "@mui/material";

interface DetailsListItemProps {
  label?: string;
  children: React.ReactNode;
  align?: "space-between" | "flex-start";
}

export default function DetailsListItem({
  label,
  children,
  align = "flex-start",
}: DetailsListItemProps) {
  return (
    <Box mb={1} display="flex" gap={1} justifyContent={align}>
      {label && (
        <Typography variant="body1" fontWeight="bold">
          {label}:
        </Typography>
      )}
      <Typography variant="body1">{children}</Typography>
    </Box>
  );
}
