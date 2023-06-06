import CircularProgress from "@mui/material/CircularProgress";

export default function SuspenseLoader(props: any) {
  const getSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      return 20; // Small size
    } else {
      return 35; // Medium size
    }
  };

  return (
    <div style={{ display: "block", textAlign: "center", margin: "1rem 0" }}>
      <CircularProgress size={getSize()} sx={props.sx && props.sx} />
    </div>
  );
}
