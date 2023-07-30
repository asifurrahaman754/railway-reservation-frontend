import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

interface LoaderProps extends CircularProgressProps {
  size?: number;
}

export default function Loader({ size, ...props }: LoaderProps) {
  const getSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      return 20;
    } else {
      return 35;
    }
  };

  return <CircularProgress size={size || getSize()} {...props} />;
}
