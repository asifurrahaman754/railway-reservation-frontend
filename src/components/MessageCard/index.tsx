import Typography, { TypographyProps } from "@mui/material/Typography";

interface MessageCard extends TypographyProps {
  children: string | React.ReactNode;
  isCenter?: boolean;
  props?: any;
}

export default function MessageCard({
  children,
  isCenter = false,
  ...typographyProps
}: MessageCard) {
  return (
    <Typography
      variant="h4"
      {...typographyProps}
      sx={{
        fontSize: {
          xs: ".9rem",
          sm: "1.2rem",
        },
        padding: "1rem 0",
        textAlign: isCenter ? "center" : "left",
      }}
      fontSize="3rem"
    >
      {children}
    </Typography>
  );
}
