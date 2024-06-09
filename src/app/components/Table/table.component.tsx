import { StyledTable, StyledThead, StyledTh, StyledTd, TableWrapper } from './table.styles';

type TableProps<T> = {
  columns: Array<keyof T>;
  data: T[];
};

const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <TableWrapper>
      <StyledTable>
        <StyledThead>
          <tr>
            {columns.map((column) => (
              <StyledTh key={String(column)}>{String(column)}</StyledTh>
            ))}
          </tr>
        </StyledThead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <StyledTd key={`${rowIndex}-${String(column)}`}>{String(row[column])}</StyledTd>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
