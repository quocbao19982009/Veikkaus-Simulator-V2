import { GameModelName } from "@/types/GameModel";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";
import TicketNumber from "../ticketRow/TicketNumber";

interface LotteryTicketProps {
  id: string;
  primaryNumbers: number[];
  secondaryNumbers: number[];
  manualSelection?: {
    primary: number[];
    secondary: number[];
  };
  highlightAll?: boolean;
  highlightPrimaryNumbers?: number[];
  gameName?: GameModelName;
  highlightSecondaryNumbers?: number[];
}

const LotteryTicket = ({
  id,
  primaryNumbers,
  secondaryNumbers,
  manualSelection,
  highlightAll,
  gameName,
  highlightPrimaryNumbers,
  highlightSecondaryNumbers,
}: LotteryTicketProps) => {
  return (
    <Box
      className="row-number"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {primaryNumbers
        .sort((a, b) => a - b)
        .map((number, index) => (
          <TicketNumber
            isHighlighted={
              highlightAll || highlightPrimaryNumbers?.includes(number)
            }
            key={`${id}_${index}_primary`}
            number={number}
            isManualSelection={
              manualSelection ? manualSelection.primary.includes(number) : false
            }
            numberType="primary"
            gameName={gameName}
          />
        ))}

      {secondaryNumbers.length !== 0 && (
        <StarIcon
          sx={{
            width: "2rem",
            margin: "0.25rem 0.25rem 0.25rem 0",
            color: "black",
          }}
        />
      )}
      {secondaryNumbers
        .sort((a, b) => a - b)
        .map((number, index) => (
          <TicketNumber
            isHighlighted={
              highlightAll || highlightSecondaryNumbers?.includes(number)
            }
            key={`${id}_${index}_${number}_secondary`}
            number={number}
            isManualSelection={
              manualSelection
                ? manualSelection.secondary.includes(number)
                : false
            }
            numberType="secondary"
            gameName={gameName}
          />
        ))}
    </Box>
  );
};

export default LotteryTicket;
