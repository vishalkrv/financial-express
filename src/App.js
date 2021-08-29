import { useDisclosure } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import { TITLE } from "./constants";
import { processFile } from "./utils/excel";
import PreviewModal from "./components/preview";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const postUpload = (file) => {
    const response = processFile(file);
    console.log(response);
    onOpen();
  };

  return (
    <>
      <Navbar title={TITLE}></Navbar>
      <Info onUpload={postUpload}></Info>
      <PreviewModal onClose={onClose} isOpen={isOpen}></PreviewModal>
    </>
  );
}

export default App;
