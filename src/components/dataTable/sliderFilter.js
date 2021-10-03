import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { RiFilterOffFill } from "react-icons/ri";

export default function SliderFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <Slider
        min={min}
        max={max}
        step={1}
        value={filterValue || min}
        onChange={(val) => {
          setFilter(parseInt(val, 10));
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      {filterValue && (
        <IconButton
          size="sm"
          icon={<RiFilterOffFill />}
          onClick={() => setFilter(undefined)}
        >
          Off
        </IconButton>
      )}
    </>
  );
}
