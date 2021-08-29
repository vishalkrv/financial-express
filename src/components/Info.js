import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Upload from "rc-upload";

export default function Info(props) {
  const toast = useToast();
  const opts = {
    type: "drag",
    accept: ".xlsx,.xls",
    multiple: false,
    onStart: (file) => {
      const reader = new FileReader();
      if (reader.readAsBinaryString) {
        reader.onload = (e) => {
          props.onUpload(e.target.result);
        };
        reader.readAsBinaryString(file);
      }
    },
    onError(err) {
      console.error(err);
      toast({
        title: "An error occurred. Please try again",
        status: "error",
        isClosable: true,
      });
    },
    style: {
      display: "inline-block",
      width: "100%",
      height: "100%",
    },
  };

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            HDFC Bank <br />
            <Text as={"span"} color={"green.400"}>
              Statement Analyzer
            </Text>
          </Heading>
          <Text color={"gray.500"}>No API used here</Text>
          <Box borderWidth="3px" borderStyle="dashed">
            <Upload {...opts}>
              <Text mt={5} fontSize="lg" color={"gray.600"}>
                Drag n drop hdfc statement file
              </Text>
              <Button
                colorScheme={"green"}
                my={6}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Upload
              </Button>
            </Upload>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
