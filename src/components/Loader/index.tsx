import { Box, BoxProps } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

interface LoaderProps extends BoxProps {}

export default function Loader({ ...props }: LoaderProps) {
  return (
    <Box p={2} textAlign="center" {...props}>
      <CircularProgress size={25} />
    </Box>
  );
}
