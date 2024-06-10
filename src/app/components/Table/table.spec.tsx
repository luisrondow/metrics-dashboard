import { render, screen } from '@testing-library/react';
import Table from './table.component';

jest.mock('./table.styles', () => {
  const TableWrapper = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

  const StyledTable = ({ children }: { children: React.ReactNode }) => <table>{children}</table>;

  const StyledThead = ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>;

  const StyledTh = ({ children }: { children: React.ReactNode }) => <th>{children}</th>;

  const StyledTd = ({ children }: { children: React.ReactNode }) => <td>{children}</td>;

  return { TableWrapper, StyledTable, StyledThead, StyledTh, StyledTd };
});

describe('Table Component', () => {
  type TestData = {
    Name: string;
    Age: number;
    Address: string;
  };

  const columns: Array<keyof TestData> = ['Name', 'Age', 'Address'];
  const data: TestData[] = [
    { Name: 'Jose da Silva', Age: 28, Address: 'Rua de Camoes' },
    { Name: 'Joao Pedro', Age: 34, Address: 'Rua de Faria Guimaraes' },
    { Name: 'Ines Tavares', Age: 22, Address: 'Rua de Costa Cabral' },
  ];

  it('matches snapshot', () => {
    const { asFragment } = render(<Table columns={columns} data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with columns', () => {
    render(<Table columns={columns} data={data} />);
    columns.forEach((column) => {
      expect(screen.getByText(String(column))).toBeInTheDocument();
    });
  });

  it('renders table with data', () => {
    render(<Table columns={columns} data={data} />);
    data.forEach((row) => {
      columns.forEach((column) => {
        expect(screen.getByText(String(row[column]))).toBeInTheDocument();
      });
    });
  });

  it('renders correct number of rows and columns', () => {
    render(<Table columns={columns} data={data} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(data.length + 1); // including header row

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(data.length * columns.length);
  });
});
