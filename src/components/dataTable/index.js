import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  usePagination,
  useSortBy,
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { useState, useMemo, useEffect } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Pagination from "./pagination";

export default function DataTable(props) {
  const [data] = useState(props.data);
  const columns = props.columns;
  const hiddenColumns =
    props.hiddenCols && props.hiddenCols.length > 1 ? props.hiddenCols : [];

  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return <></>;
  }

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (props.globalFilter) {
      if (props.globalFilter.length > 0) {
        setGlobalFilter(props.globalFilter[0]);
      } else {
        setGlobalFilter(undefined);
      }
    }
  }, [props.globalFilter]);

  return (
    <>
      <Flex direction="column" rounded="md">
        <Table {...getTableProps()} size="md">
          <Thead backgroundColor="gray.100">
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, headerIndex) => (
                  <Th width={`${column.width}px`} key={headerIndex}>
                    <Flex>
                      <Box
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                      </Box>
                      <Box display="inline-block">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <Icon as={FaCaretDown} w={4} h={4} />
                          ) : (
                            <Icon as={FaCaretUp} w={4} h={4} />
                          )
                        ) : null}
                      </Box>
                    </Flex>

                    <Flex minH={8} mt={5}>
                      {column.canFilter ? column.render("Filter") : null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex
          direction="row"
          justifyContent="flex-end"
          mt={-2}
          pt={2}
          pb={2}
          backgroundColor="#EDF2F7"
        >
          <Pagination
            pageSize={state.pageSize}
            setPageSize={setPageSize}
            pageIndex={state.pageIndex}
            pageOptions={pageOptions}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            nextPage={nextPage}
            canNextPage={canNextPage}
          />
        </Flex>
      </Flex>
    </>
  );
}
