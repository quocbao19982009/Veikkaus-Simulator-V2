import { Box, Typography } from "@mui/material";
import SelectableNumberBox from "./SelectableNumberBox";

interface NumberGridProps {
  title: string;
  totalNumbers: number;
  maxNumberSelected: number;
  selectedNumbers: number[];
  onNumberSelected: (number: number) => void;
  disabled?: boolean;
}

const NumberGrid = ({
  disabled,
  totalNumbers,
  maxNumberSelected,
  title,
  selectedNumbers,
  onNumberSelected,
}: NumberGridProps) => {
  const numberArray = Array.from({ length: totalNumbers }, (_, i) => i + 1);
  const selectedNumbersCount = selectedNumbers.length;
  const numberToSelected = maxNumberSelected - selectedNumbersCount;

  const isNumberSelected = (number: number) => {
    return selectedNumbers.some((n) => n === number);
  };

  const isNumberDisabled = (number: number) => {
    return !isNumberSelected(number) && numberToSelected === 0;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Typography fontWeight={"bold"}>{title}</Typography>
      <Box
        sx={{
          minHeight: "1.5rem",
        }}
      >
        {numberToSelected !== 0 && (
          <Typography>Choose {numberToSelected} numbers</Typography>
        )}
      </Box>
      <Box
        sx={{
          // mt: 2,
          display: "grid",
          width: {
            xs: "100%",
            sm: "auto",
          },
          gap: {
            xs: "1rem",
            sm: "0.75rem",
            md: "0.5rem",
          },
          alignItems: "baseline",
          justifyItems: "center",
          gridAutoRows: {
            xs: "2.5rem",
            md: "2rem",
          },
          gridTemplateColumns: {
            xs: "repeat(auto-fit, minmax(2.5rem, 1fr))",
            md: "repeat(10, 2rem)",
            sm: "repeat(10, 2rem)",
          },
        }}
      >
        {numberArray.map((number) => (
          <SelectableNumberBox
            sx={{
              width: "100%",
            }}
            id={`number_${number}_${title}`}
            isDisabled={disabled || isNumberDisabled(number)}
            isSelected={isNumberSelected(number)}
            key={`number_${number}_${title}`}
            onClick={() => onNumberSelected(number)}
          >
            <Typography component="span" fontWeight={600}>
              {number}
            </Typography>
          </SelectableNumberBox>
        ))}
      </Box>
    </Box>
  );
};

export default NumberGrid;
