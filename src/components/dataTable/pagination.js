import { Box, Button, Flex } from '@chakra-ui/react'

export default function Pagination({
  pageSize,
  setPageSize,
  pageIndex,
  pageOptions,
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
}) {
  return (
    <Flex direction="row" justifyContent="space-between">
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        pl="64px"
      >
        <Box pr={4}>Rows per page:</Box>
        <select
          style={{ background: 'transparent', outline: 'none' }}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </Flex>
      <Flex alignItems="center" justifyContent="center" pl="64px">
        {`${pageIndex + 1} - ${pageSize}`} of {pageOptions.length}
      </Flex>
      <Flex alignItems="center" justifyContent="center" pl="64px">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>
      </Flex>
    </Flex>
  )
}
