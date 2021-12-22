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
import moment from "moment";

export default function PreviewModal(props) {
  const maxPreviewRows = 3;
  const maxColumns = 7;
  const [profile] = useState(PROFILES.HDFC);
  const [preview, setPreview] = useState({});
  const { register, handleSubmit } = useForm({
    defaultValues: [],
  });

  const updateData = (response) => {
    let uniqueYear = {};
    for (const item of response.parsedData) {
      item.day = moment(item.date, "DD/MM/YY").format("dddd");
      item.year = moment(item.date, "DD/MM/YY").format("YYYY");
      item.month = moment(item.date, "DD/MM/YY").format("MMMM");
      uniqueYear[item.year] = true;
      item.tags = [];
      if (item.description.toLowerCase().indexOf("upi-") !== -1) {
        item.tags.push("upi");
      }
      if (item.description.toLowerCase().indexOf("emi") !== -1) {
        item.tags.push("emi");
        item.tags.push("bills");
      }
      if (item.description.toLowerCase().indexOf("neft") !== -1) {
        item.tags.push("neft");
      }
      if (item.description.toLowerCase().indexOf("imps") !== -1) {
        item.tags.push("imps");
      }
      if (item.description.toLowerCase().indexOf("rtgs") !== -1) {
        item.tags.push("rtgs");
      }
      if (item.description.toLowerCase().indexOf("salary") !== -1) {
        item.tags.push("salary");
      }
      if (item.description.toLowerCase().indexOf("milk") !== -1) {
        item.tags.push("food");
      }
      if (item.description.toLowerCase().indexOf("rent") !== -1) {
        item.tags.push("bills");
        item.tags.push("house");
      }
      if (item.description.toLowerCase().indexOf("billdesk") !== -1) {
        item.tags.push("bills");
      }
      if (item.description.toLowerCase().indexOf("kirana") !== -1) {
        item.tags.push("food");
      }
      if (item.description.toLowerCase().indexOf("zerodha") !== -1) {
        item.tags.push("investment");
        item.tags.push("zerodha");
      }
      if (item.description.toLowerCase().indexOf("zomato") !== -1) {
        item.tags.push("food");
      }
      if (item.description.toLowerCase().indexOf("food") !== -1) {
        item.tags.push("food");
      }
      if (item.description.toLowerCase().indexOf("ach c-") !== -1) {
        item.tags.push("dividend");
        item.tags.push("investment");
      }
      if (item.description.toLowerCase().indexOf("pharamacy") !== -1) {
        item.tags.push("health");
      }
      if (item.description.toLowerCase().indexOf("broadband") !== -1) {
        item.tags.push("bills");
      }
      if (item.description.toLowerCase().indexOf("amazon") !== -1) {
        item.tags.push("amazon");
      }
      if (item.description.toLowerCase().indexOf("sidsfarm") !== -1) {
        item.tags.push("food");
      }
      if (item.description.toLowerCase().indexOf("mithaiwala") !== -1) {
        item.tags.push("food");
      }
      if (item.description.toLowerCase().indexOf("uber") !== -1) {
        item.tags.push("transport");
      }
      if (item.description.toLowerCase().indexOf("decathlon") !== -1) {
        item.tags.push("clothes");
      }
      if (item.description.toLowerCase().indexOf("vegetables") !== -1) {
        item.tags.push("food");
      }
      if (item.description.toLowerCase().indexOf("olacabs") !== -1) {
        item.tags.push("transport");
      }
      if (item.description.toLowerCase().indexOf("petrol") !== -1) {
        item.tags.push("transport");
      }
    }

    response.uniqueYear = uniqueYear;
    return response;
  };
  const onSubmit = (data) => {
    let response = processFile(
      null,
      true,
      data.startIndex,
      data.endIndex,
      COL_NAMES,
      props.data.originalData
    );

    response.processed = true;
    response = updateData(response);
    props.setData(response);
    props.onClose();
  };

  const onPreview = (data) => {
    setPreview({
      ...preview,
      startIndex: parseInt(data.startIndex, 10),
      endIndex: parseInt(data.endIndex, 10),
    });
  };

  const prepData = () => {
    let rows = [];
    let index = preview.startIndex;
    if (preview && preview.data && preview.data.length > 0) {
      for (let i = index; i < index + maxPreviewRows; i++) {
        let cols = [];
        let temp = Object.keys(preview.data[i]);
        for (let j = 0; j < maxColumns; j++) {
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

  const prepDataEnd = () => {
    let rows = [];
    let index = preview.endIndex;
    if (
      preview &&
      preview.data &&
      preview.data.length > 0 &&
      preview.data[index]
    ) {
      for (let i = index; i > index - maxPreviewRows; i--) {
        let cols = [];
        let temp = Object.keys(preview.data[i]);
        for (let j = 0; j < maxColumns; j++) {
          let val = preview.data[i][temp[j]];
          cols.push(
            <Td key={j}>
              <Text fontSize="xs">{(val && val) || "NA"}</Text>
            </Td>
          );
        }
        rows.unshift(<Tr key={i}>{cols}</Tr>);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" spacing={10}>
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
                <FormControl id="startIndex">
                  <FormLabel>End Row</FormLabel>
                  <Input
                    type="number"
                    defaultValue={preview.endIndex}
                    {...register("endIndex", { min: 1 })}
                  />
                  <FormHelperText>
                    Row number of the last transaction
                  </FormHelperText>
                </FormControl>
              </Stack>

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
            <Stack>
              <Table
                bg={useColorModeValue("gray.200", "gray.800")}
                rounded="md"
              >
                <TableCaption placement="top">
                  Preview of start row <br></br>
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
              <Table
                bg={useColorModeValue("gray.200", "gray.800")}
                rounded="md"
              >
                <TableCaption placement="top">
                  Preview of end row <br></br>
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
                  {prepDataEnd()}
                </Tbody>
              </Table>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
