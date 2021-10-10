import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PROFILES, COL_NAMES } from "../constants";
import { processFile } from "../utils/excel";

export default function PreviewModal(props) {
  const [profile] = useState(PROFILES.HDFC);
  const [preview, setPreview] = useState({});
  const { register, handleSubmit } = useForm({
    defaultValues: [],
  });

  const onSubmit = (data) => {
    const response = processFile(
      null,
      true,
      data.startIndex,
      COL_NAMES,
      props.data.originalData
    );

    response.processed = true;
    props.setData(response);
    props.onClose();
  };

  const onPreview = (data) => {
    setPreview({
      ...preview,
      startIndex: data.startIndex,
    });
  };

  const prepData = () => {
    let rows = [];
    let index = preview.startIndex;
    if (preview && preview.data && preview.data.length > 0) {
      for (let i = index; i < index + 6; i++) {
        let cols = [];
        let temp = Object.keys(preview.data[i]);
        for (let j = 0; j < 7; j++) {
          let val = preview.data[i][temp[j]];
          cols.push(
            <Td key={j}>
              <Text fontSize="xs">{val}</Text>
            </Td>
          );
        }
        rows.push(<Tr key={i}>{cols}</Tr>);
      }
      return rows;
    }
    return rows;
  };

  useEffect(() => {
    if (props.data && props.data.parsedData) {
      setPreview({
        data: props.data.parsedData,
        ...profile,
      });
    }
  }, [props.data, profile]);
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
        onClose={props.onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent maxWidth={1250}>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "250px" }}>
              <FormControl id="startIndex">
                <FormLabel>Start Row</FormLabel>
                <Input
                  type="number"
                  defaultValue={preview.startIndex}
                  {...register("startIndex", { min: 1 })}
                />
                <FormHelperText>
                  Row number of the first transaction
                </FormHelperText>
              </FormControl>

              <Stack direction="row" py={5} spacing={10}>
                <Button
                  colorScheme="blue"
                  type="submit"
                  onClick={handleSubmit(onPreview)}
                >
                  Preview
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Stack>
            </form>
            <Table bg={useColorModeValue("gray.200", "gray.800")} rounded="md">
              <TableCaption>
                Note: Preview Results limited to 6 rows only
              </TableCaption>
              <Thead>
                <Tr>
                  {preview &&
                    preview.columns &&
                    preview.columns.map((item, index) => (
                      <Th key={index}>{item}</Th>
                    ))}
                </Tr>
              </Thead>
              <Tbody overflow="auto" height="200px">
                {prepData()}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
