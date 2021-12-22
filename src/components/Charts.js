import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  SimpleGrid,
  useColorModeValue,
  Heading,
  Box,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Bar, Pie } from "react-chartjs-2";
import {
  weekDayLabels,
  getColors,
  monthlyLabels,
  transactionModeLabels,
  transactionCategoryLabels,
  colors,
  earningLabels,
} from "../constants";
import moment from "moment";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

let chartSchema = {
  weekly: {
    type: "bar",
    options: {
      responsive: true,
      parsing: false,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Weekly Transactions",
        },
      },
    },
    data: {
      labels: weekDayLabels,
      datasets: [],
    },
  },
  monthly: {
    type: "bar",
    options: {
      responsive: true,
      parsing: false,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Monthly Transactions",
        },
      },
    },
    data: {
      labels: monthlyLabels,
      datasets: [],
    },
  },
  earning: {
    type: "bar",
    options: {
      responsive: true,
      parsing: false,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Monthly Income",
        },
      },
    },
    data: {
      labels: monthlyLabels,
      datasets: [],
    },
  },
  transactionMode: {
    type: "pie",
    options: {
      responsive: true,
      parsing: false,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Transaction Mode",
        },
      },
    },
    data: {
      labels: monthlyLabels,
      datasets: [],
    },
  },
  transactionCategory: {
    type: "pie",
    options: {
      responsive: true,
      parsing: false,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "Transaction Category",
        },
      },
    },
    data: {
      labels: transactionCategoryLabels,
      datasets: [],
    },
  }
};

const Charts = ({ data }) => {
  const [chartData, setChartData] = useState({});

  function analyzeAndUpdate() {
    let weekly_total = [],
      weekly_credit = [],
      weekly_debit = [],
      monthly_total = [],
      monthly_credit = [],
      monthly_debit = [],
      transactionMode = [],
      transactionCategory = [],
      monthly_salary = [],
      monthly_dividend = [],
      monthly_others = [];

    let copy = { ...chartSchema };

    for (let i of weekDayLabels) {
      //Total Transactions
      weekly_total.push({
        x: i,
        y: 0,
      });

      //Credit Transactions
      weekly_credit.push({
        x: i,
        y: 0,
      });

      //Debit Transactions
      weekly_debit.push({
        x: i,
        y: 0,
      });
    }

    for (let i of monthlyLabels) {
      //Total Transactions
      monthly_total.push({
        x: i,
        y: 0,
      });

      monthly_salary.push({
        x: i,
        y: 0,
      });

      monthly_dividend.push({
        x: i,
        y: 0,
      });

      monthly_others.push({
        x: i,
        y: 0,
      });

      //Credit Transactions
      monthly_credit.push({
        x: i,
        y: 0,
      });

      //Debit Transactions
      monthly_debit.push({
        x: i,
        y: 0,
      });
    }

    for (const temp of data) {
      //Total Transactions
      weekly_total[weekDayLabels.indexOf(temp.day)].y++;
      monthly_total[monthlyLabels.indexOf(temp.month)].y =
        monthly_total[monthlyLabels.indexOf(temp.month)].y +
        temp.deposit +
        temp.withdrawal;

      //Credit Transactions
      if (temp.deposit) {
        weekly_credit[weekDayLabels.indexOf(temp.day)].y++;
        monthly_credit[monthlyLabels.indexOf(temp.month)].y =
          monthly_credit[monthlyLabels.indexOf(temp.month)].y + temp.deposit;

        if (temp.tags.includes("salary")) {
          monthly_salary[monthlyLabels.indexOf(temp.month)].y =
            monthly_salary[monthlyLabels.indexOf(temp.month)].y + temp.deposit;
        } else if (temp.tags.includes("dividend")) {
          monthly_dividend[monthlyLabels.indexOf(temp.month)].y =
            monthly_dividend[monthlyLabels.indexOf(temp.month)].y +
            temp.deposit;
        } else {
          monthly_others[monthlyLabels.indexOf(temp.month)].y =
            monthly_others[monthlyLabels.indexOf(temp.month)].y + temp.deposit;
        }
      }

      //Debit Transactions
      if (temp.withdrawal) {
        weekly_debit[weekDayLabels.indexOf(temp.day)].y++;
        monthly_debit[monthlyLabels.indexOf(temp.month)].y =
          monthly_debit[monthlyLabels.indexOf(temp.month)].y + temp.withdrawal;
      }

      //Transaction Mode
      transactionModeLabels.map((mode, modeIndex) => {
        if (temp.tags.includes(mode.toLowerCase())) {
          if (transactionMode[modeIndex]) {
            transactionMode[modeIndex]++;
          } else {
            transactionMode[modeIndex] = 1;
          }
        }
      });
      //Transaction Mode
      transactionCategoryLabels.map((category, categoryIndex) => {
        if (temp.tags.includes(category.toLowerCase())) {
          if (transactionCategory[categoryIndex]) {
            transactionCategory[categoryIndex] =
              transactionCategory[categoryIndex] + temp.withdrawal;
          } else {
            transactionCategory[categoryIndex] = temp.withdrawal;
          }
        }
      });
    }

    copy.weekly.data = {
      labels: weekDayLabels,
      datasets: [
        {
          label: "Total",
          data: weekly_total,
          backgroundColor: getColors(0),
          borderColor: getColors(0),
        },
        {
          label: "Credit",
          data: weekly_credit,
          backgroundColor: getColors(1),
          borderColor: getColors(1),
        },
        {
          label: "Debit",
          data: weekly_debit,
          backgroundColor: getColors(2),
          borderColor: getColors(2),
        },
      ],
    };

    copy.monthly.data = {
      labels: monthlyLabels,
      datasets: [
        {
          label: "Total",
          data: monthly_total,
          backgroundColor: getColors(0),
          borderColor: getColors(0),
        },
        {
          label: "Credit",
          data: monthly_credit,
          backgroundColor: getColors(1),
          borderColor: getColors(1),
        },
        {
          label: "Debit",
          data: monthly_debit,
          backgroundColor: getColors(2),
          borderColor: getColors(2),
        },
      ],
    };

    copy.transactionMode.data = {
      labels: transactionModeLabels,
      datasets: [
        {
          label: "# of transaction mode",
          data: transactionMode,
          backgroundColor: colors,
        },
      ],
    };

    copy.transactionCategory.data = {
      labels: transactionCategoryLabels,
      datasets: [
        {
          label: "Sum of transactions",
          data: transactionCategory,
          backgroundColor: colors,
        },
      ],
    };

    copy.earning.data = {
      labels: monthlyLabels,
      datasets: [
        {
          label: "Salary",
          data: monthly_salary,
          backgroundColor: getColors(0),
          borderColor: getColors(0),
        },
        {
          label: "Dividend",
          data: monthly_dividend,
          backgroundColor: getColors(1),
          borderColor: getColors(1),
        },
        {
          label: "Others",
          data: monthly_others,
          backgroundColor: getColors(2),
          borderColor: getColors(2),
        },
      ],
    };

    setChartData(copy);
  }

  useEffect(() => {
    analyzeAndUpdate();
  }, [data]);

  return (
    <>
      <Wrap textAlign="center" rounded="lg" color="gray.400">
        {chartData &&
          Object.keys(chartData).length > 0 &&
          Object.keys(chartData).map((chart, index) => {
            return (
              <WrapItem>
                {chartData[chart].type === "bar" && (
                  <Box
                    boxShadow="md"
                    p={1}
                    rounded="lg"
                    bg="gray.800"
                    key={index}
                    minW="620px"
                  >
                    <Bar
                      data={chartData[chart].data}
                      options={chartData[chart].options}
                    />
                  </Box>
                )}
                {chartData[chart].type === "pie" && (
                  <Box
                    boxShadow="md"
                    p={1}
                    rounded="lg"
                    bg="gray.800"
                    key={index}
                    w="420px"
                  >
                    <Pie
                      data={chartData[chart].data}
                      options={chartData[chart].options}
                    />
                  </Box>
                )}
              </WrapItem>
            );
          })}
      </Wrap>
    </>
  );
};

export default Charts;
