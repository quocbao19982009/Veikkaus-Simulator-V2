import { LotteryInGame } from "@/types/GameModel";
import { GameSetting } from "@/types/GameSetting.interfaces";
import { LotteryTicketModel } from "@/types/LotteryTicketModel";

/**
 * Checks if a ticket is completed by comparing the number of primary and secondary numbers selected with the maximum allowed numbers.
 * @param primaryNumber - An array of primary numbers selected.
 * @param secondaryNumber - An array of secondary numbers selected.
 * @param primaryNumberCount - The maximum number of primary numbers allowed to be selected.
 * @param secondaryNumberCount - The maximum number of secondary numbers allowed to be selected.
 * @returns A boolean indicating whether the ticket is completed or not.
 */
export const isTicketCompleted = (
  primaryNumber: number[],
  secondaryNumber: number[],
  primaryNumberCount: number,
  secondaryNumberCount: number
): boolean => {
  return (
    primaryNumber.length === primaryNumberCount &&
    secondaryNumber.length === secondaryNumberCount
  );
};

/**
 * Creates a random ticket based on the given parameters.
 *
 * @param ticket - The input ticket with manual selections.
 * @param primaryNumberCount - The maximum number of primary numbers to be selected.
 * @param primaryNumberRange - The total number of available primary numbers.
 * @param secondaryNumberCount - The maximum number of secondary numbers to be selected.
 * @param secondaryNumberRange - The total number of available secondary numbers.
 * @returns A new LotteryInput object representing the random ticket.
 */
export const createRandomTicket = (
  ticket: LotteryTicketModel,
  primaryNumberCount: number,
  primaryNumberRange: number,
  secondaryNumberCount: number,
  secondaryNumberRange: number
): LotteryTicketModel => {
  const manualSelectionPrimary = ticket?.manualSelection.primary || [];
  const manualSelectionSecondary = ticket?.manualSelection.secondary || [];

  // Create a random ticket
  const primaryNumbers: number[] = [...manualSelectionPrimary];
  const secondaryNumbers: number[] = [...manualSelectionSecondary];

  while (primaryNumbers.length < primaryNumberCount) {
    const number = Math.floor(Math.random() * primaryNumberRange) + 1;
    if (!primaryNumbers.includes(number)) {
      primaryNumbers.push(number);
    }
  }

  while (secondaryNumbers.length < secondaryNumberCount) {
    const number = Math.floor(Math.random() * secondaryNumberRange) + 1;
    if (!secondaryNumbers.includes(number)) {
      secondaryNumbers.push(number);
    }
  }

  return {
    ...ticket,
    primaryNumbers,
    secondaryNumbers,
  };
};

export const dateFormat = (date: Date) => {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  let month: number | string = dateObj.getMonth() + 1;
  let dt: number | string = dateObj.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${dt}.${month}.${year}`;
};

const compareLotteryTicket = (arr1: number[], arr2: number[]) => {
  return arr1.filter((item) => arr2.includes(item));
};

export const matchNumberLottery = (
  playerLottery: LotteryInGame,
  resultLottery: LotteryInGame
) => {
  const {
    primaryNumbers: numberSelectedbyUser,
    secondaryNumbers: starNumberSelectedbyUser,
  } = playerLottery;
  const {
    primaryNumbers: numberSelectedResult,
    secondaryNumbers: starNumberSelectedResult,
  } = resultLottery;

  const matchNumber = compareLotteryTicket(
    numberSelectedbyUser,
    numberSelectedResult
  );
  const matchStarNumber = compareLotteryTicket(
    starNumberSelectedbyUser,
    starNumberSelectedResult
  );

  return { matchNumber, matchStarNumber };
};

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};

export const formatMoney = (price: number) => {
  return new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

// Return date and time in format "dd.mm.yyyy hh:mm"
export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  return `${hours}:${minutes} / ${day}.${month}.${year} `;
};

export const validateTickets = (
  tickets: LotteryTicketModel[],
  gameSettings: GameSetting
) => {
  const {
    primaryNumberCount,
    primaryNumberRange,
    secondaryNumberCount,
    secondaryNumberRange,
  } = gameSettings;

  const ticketNumberRangeValid = tickets.every((ticket) =>
    isTicketCompleted(
      ticket.primaryNumbers,
      ticket.secondaryNumbers,
      primaryNumberCount,
      secondaryNumberCount
    )
  );

  const ticketNumberValid = tickets.every((ticket) => {
    return (
      ticket.primaryNumbers.every(
        (number) => number >= 1 && number <= primaryNumberRange
      ) &&
      ticket.secondaryNumbers.every(
        (number) => number >= 1 && number <= secondaryNumberRange
      )
    );
  });

  return ticketNumberValid && ticketNumberRangeValid;
};
