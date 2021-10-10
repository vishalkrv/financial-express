import { read, utils } from "xlsx";

export function processFile(
  data,
  isProcessed = false,
  startIndex = 0,
  header = "A",
  originalData = null
) {
  let workbook, excelRows;
  if (!isProcessed) {
    workbook = read(data, { type: "binary" });
  } else {
    workbook = originalData;
  }

  const firstSheet = workbook.SheetNames[0];
  excelRows = utils.sheet_to_json(workbook.Sheets[firstSheet], {
    header: header,
    range: Number(startIndex),
    defval: null,
    blankrows: true,
  });

  return {
    parsedData: excelRows,
    originalData: workbook,
  };
}
