import {
  Input,
  InputGroup,
  InputRightElement,
  CloseButton,
} from '@chakra-ui/react'

export default function TextFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <InputGroup>
      <Input
        size="sm"
        variant="outline"
        value={filterValue || ''}
        borderRadius="5"
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ...`}
      />
      <InputRightElement h="full">
        {filterValue && filterValue !== '' && (
          <CloseButton
            size="sm"
            onClick={() => {
              filterValue = ''
              setFilter('')
            }}
          />
        )}
      </InputRightElement>
    </InputGroup>
  )
}
