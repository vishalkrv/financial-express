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
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { COL_NAMES } from "../constants";

export default function PreviewModal(props) {
  const { data, setData } = props;
  const [preview, setPreview] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: [],
  });

  const onSubmit = (data) => {
    console.log("submitted data", data);
  };

  const onPreview = (data) => {
    setPreview({
      ...preview,
      startIndex: data.startIndex,
    });
  };

  const prepData = () => {
    let rows = [];
    let index = preview.startIndex - 1;
    if (preview && preview.data && preview.data.length > 0) {
      for (let i = index; i < index + 6; i++) {
        let cols = [];
        let temp = Object.keys(preview.data[i]);
        for (let j = 0; j < 7; j++) {
          let val = preview.data[i][temp[j]];
          cols.push(
            <Td maxWidth={150} key={j}>
              {val}
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
    if (data && data.parsedData) {
      setPreview({
        startIndex: 18,
        data: data.parsedData,
        cols: COL_NAMES,
      });
    }
  }, [props.data]);
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
        onClose={props.onClose}
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent maxWidth={1050}>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="startIndex">
                <FormLabel>Start Row</FormLabel>
                <Input
                  type="number"
                  defaultValue={preview.startIndex}
                  {...register("startIndex", { min: 1 })}
                />
                <FormHelperText>
                  Row no to start processing for transactions
                </FormHelperText>
              </FormControl>
              <Text>Column Mapping</Text>
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
                    preview.cols &&
                    preview.cols.map((item, index) => (
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
