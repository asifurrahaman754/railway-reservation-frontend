import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useSearchParams() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params: any = new URLSearchParams(search);
  const fromCity = params.get("fromCity");
  const toCity = params.get("toCity");
  const seat = params.get("seat");
  const date = new Date(params.get("date"));
  const formattedDate = date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/(\d+)(st|nd|rd|th)/, "$1");

  // check if params exist in the url
  useEffect(() => {
    // TODO: this is not so good, need to find a better way
    if (!fromCity || !toCity || !seat || !date) {
      navigate("/");
    }
  }, []);

  return {
    fromCity,
    toCity,
    seat,
    formattedDate,
    date: params.get("date"),
  };
}
