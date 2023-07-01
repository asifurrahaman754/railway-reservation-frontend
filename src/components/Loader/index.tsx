import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({ size, sx }: any) {
  const getSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      return 20; // Small size
    } else {
      return 35; // Medium size
    }
  };

  return (
    <CircularProgress
      size={size || getSize()}
      sx={{ margin: "1rem auto", display: "block", ...sx }}
    />
  );
}
