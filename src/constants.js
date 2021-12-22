export const TITLE = "Financial Express";
export const COL_NAMES = [
  "date",
  "description",
  "referenceNo",
  "transactionDate",
  "withdrawal",
  "deposit",
  "balance",
];

export const PROFILES = {
  HDFC: {
    startIndex: 22,
    endIndex: 448,
    columns: [
      "Date",
      "Narration",
      "Chq./Ref.No.",
      "Value Dt",
      "Withdrawal Amt.",
      "Deposit Amt.",
      "Closing Balance",
    ],
  },
};

export const weekDayLabels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const monthlyLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const transactionModeLabels = ["UPI", "NEFT", "IMPS", "RTGS"];
export const transactionCategoryLabels = [
  "FOOD",
  "BILLS",
  "HOUSE",
  "HEALTH",
  "AMAZON",
  "TRANSPORT",
  "CLOTHES",
];
export const earningLabels = ["SALARY", "DIVIDEND", "OTHERS"];

export const colors = [
  "rgba(232, 67, 147,1.0)",
  "rgba(9, 132, 227,1.0)",
  "rgba(253, 203, 110,1.0)",
  "rgba(108, 92, 231,1.0)",
  "rgba(214, 48, 49,1.0)",
  "rgba(0, 184, 148,1.0)",
  "rgba(163, 203, 56,1.0)",
  "rgba(0, 206, 201,1.0)",
];

export const getColors = (index) => {
  return [colors[index]];
};
