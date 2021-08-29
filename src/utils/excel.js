import { read, utils } from "xlsx";

export function processFile(data, isFile) {
  const workbook = read(data, { type: "binary" });

  const firstSheet = workbook.SheetNames[0];
  const excelRows = utils.sheet_to_row_object_array(
    workbook.Sheets[firstSheet]
  );

  return {
    parsedData: excelRows,
    originalData: workbook,
  };
}
