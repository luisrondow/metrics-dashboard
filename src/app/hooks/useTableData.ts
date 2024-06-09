import { useState } from "react";
import { Metric } from "../types/metrics";
import { tableValueFormatter } from "../utils/formatters";

type TableDate = {
  Label: string;
  Description: string;
  Category: string;
  Value: string;
}

export default function useTableData() {
  const columns: Array<keyof TableDate> = ['Label', 'Description', 'Category', 'Value'];

  const [data, setData] = useState<TableDate[]>([]);

  const setTableData = (metrics: Metric[], ids: string[]) => {
    const tableData = metrics
    .filter((metric) => ids.includes(metric.id))
    .map((metric) => {
      const { label, description, category, value, type } = metric;

      return {
        Label: label,
        Description: description,
        Category: category,
        Value: tableValueFormatter(value, type),
      };
    });

    setData(tableData);
  }

  return { columns, data, setTableData };
}