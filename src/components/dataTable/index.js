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
  Heading,
  InputGroup,
  InputRightElement,
  Input,
  CloseButton,
  useColorModeValue,
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
import { FiSearch } from "react-icons/fi";
import Pagination from "./pagination";

export default function DataTable(props) {
  const [data, setData] = useState(props.data);
  const columns = props.columns;
  const hiddenColumns =
    props.hiddenCols && props.hiddenCols.length > 0 ? props.hiddenCols : [];

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

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <>
      <Flex direction="column" rounded="md" h="100%" overflow="auto">
        <Flex direction="row" pt={2} pb={2} justifyContent="space-between">
          <Flex>
            {props?.title && <Heading size="md">{props.title}</Heading>}
          </Flex>
          {props.hasGlobalSearch && (
            <Flex>
              <InputGroup focusBorderColor="transparent" minW={350}>
                <InputRightElement h="full">
                  {state.globalFilter && state.globalFilter !== "" && (
                    <CloseButton
                      size="sm"
                      onClick={() => {
                        setGlobalFilter(undefined);
                      }}
                    />
                  )}
                </InputRightElement>
                <Input
                  type="text"
                  value={state.globalFilter || ""}
                  onChange={(e) => {
                    setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                  }}
                  placeholder="Type here to search across all columns"
                  _placeholder={{ textAlign: "center" }}
                />
              </InputGroup>
            </Flex>
          )}
          <Flex>{props.btnGroup}</Flex>
        </Flex>
        <Flex
          rounded="md"
          border="solid"
          borderColor={useColorModeValue("gray.100", "gray.700")}
          boxShadow="lg"
          h="100%"
          overflow="auto"
          direction="column"
        >
          <Box h="100%" overflow="auto">
            <Table {...getTableProps()} size="sm" h="100%" overflow="auto">
              <Thead pos="sticky" top="0" bg={useColorModeValue('gray.200', 'gray.900')}>
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, headerIndex) => (
                      <Th width={`${column.width}px`} py={3} key={headerIndex}>
                        <Flex justifyContent="center">
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

                        {/* {column.canFilter && (
                        <Flex minH={8} mt={5} justifyContent="center">
                          {column.render("Filter")}
                        </Flex>
                      )} */}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()} w="100%">
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td
                          {...cell.getCellProps()}
                          isNumeric={cell.column.isNumeric}
                          textAlign="center"
                        >
                          {cell.render("Cell")}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
          <Flex direction="row" justifyContent="flex-end" mt={-2} pt={2} pb={2}>
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
      </Flex>
    </>
  );
}
