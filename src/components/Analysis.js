import {
  Box,
  Heading,
  Flex,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import DataTable from "./dataTable";
import Charts from "./Charts";


export default function Analysis({ data }) {
  
  const [availableYear, setAvailableYear] = useState([
    "All",
    ...Object.keys(data.uniqueYear),
  ]);

  //Initially all the year data is shown
  const [selectedYear, setSelectedYear] = useState("All");

  //Table Data
  const [tableData, setTableData] = useState([]);

  //Columns to be shown in data table
  const columns = useMemo(
    () => [
      {
        Header: "Ref No",
        accessor: "referenceNo",
        width: 300,
      },
      {
        Header: "Description",
        accessor: "description",
        width: 300,
      },
      {
        Header: "Date",
        accessor: "date",
        width: 300,
      },
      {
        Header: "Deposit",
        accessor: "deposit",
        width: 300,
      },
      {
        Header: "Withdrawal",
        accessor: "withdrawal",
        width: 300,
      },
    ],
    []
  );

  useEffect(() => {
    setTableData(data.parsedData);
  }, [data.parsedData]);

  useEffect(() => {
    if (selectedYear === "All") {
      setTableData(data.parsedData);
    } else {
      const results = data.parsedData.filter((obj) => {
        return obj.year === selectedYear.toString();
      });
      setTableData(results);
    }
  }, [selectedYear]);

  return (
    <Flex p={10} direction="column">
      <Flex justifyContent="end" alignItems="center">
        <Heading size="xs">Select a year to filter:</Heading>
      </Flex>
      <Box h={500}>
        <DataTable
          data={tableData}
          columns={columns}
          hasGlobalSearch={true}
          title="List of records"
          btnGroup={
            <ButtonGroup isAttached variant="outline" ml={5}>
              {availableYear &&
                availableYear.length > 0 &&
                availableYear.map((year) => (
                  <Button
                    isActive={year === selectedYear}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </Button>
                ))}
            </ButtonGroup>
          }
        />
      </Box>
      <Charts data={tableData}></Charts>
    </Flex>
  );
}
