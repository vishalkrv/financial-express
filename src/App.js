import { useDisclosure } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import { TITLE } from "./constants";
import { processFile } from "./utils/excel";
import PreviewModal from "./components/preview";
import Analysis from "./components/Analysis";
import { useState } from "react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    processed: false,
  });

  // const [data, setData] = useState({});

  const postUpload = (file) => {
    const response = processFile(file, false);
    setData(response);
    onOpen();
  };

  return (
    <>
      <Navbar title={TITLE}></Navbar>
      {(data && data.processed && <Analysis data={data}></Analysis>) || (
        <Info onUpload={postUpload}></Info>
      )}
      <PreviewModal
        onClose={onClose}
        isOpen={isOpen}
        data={data}
        setData={setData}
      ></PreviewModal>
    </>
  );
}

export default App;
