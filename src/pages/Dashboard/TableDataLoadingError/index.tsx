import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Loader from "components/Loader";

type TableDataLoadingErrorProps = {
  isLoading: boolean;
  isError: boolean;
  data: unknown[];
};

export default function TableDataLoadingError({
  isLoading,
  isError,
  data,
}: TableDataLoadingErrorProps) {
  return (
    <>
      {isLoading && (
        <TableRow>
          <TableCell colSpan={10}>
            <Loader />
          </TableCell>
        </TableRow>
      )}

      {/*TODO: need to use error from api */}
      {isError && (
        <TableRow>
          <TableCell colSpan={10}>
            <Typography variant="body2" align="center">
              Failed to load data
            </Typography>
          </TableCell>
        </TableRow>
      )}

      {data?.length === 0 && (
        <TableRow>
          <TableCell colSpan={10}>
            <Typography variant="body2" align="center">
              No data found
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
