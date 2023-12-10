const { default: Column } = require('./Column');
const { default: TableRow } = require('./TableRow');

const TableComponent = (props) => {
  const { data=[], columns=[] } = props;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <Column key={index}>{column}</Column>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {data.map((row, i) => (
              <TableRow key={i} row={row} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
