import { Box, BoxProps } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

interface LoaderProps extends BoxProps {
  size?: number;
}

export default function Loader({ size = 25, ...props }: LoaderProps) {
  return (
    <Box p={2} textAlign="center" {...props}>
      <CircularProgress size={size} />
    </Box>
  );
}
