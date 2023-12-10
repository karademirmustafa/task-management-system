import getNestedValue from './utils/getNestedValue';

const TableRow = ({ row, columns }) => {
  return (
    //   <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //   {columns.map((column, index) => (
    //     <td key={index} className="px-6 py-4">
    //       {/* {row[Object.keys(row).find(row => row===column.key)] && column.row}  */}
    //       {getNestedValue(row, column.key) && column.row}
    //     </td>

    //   ))}
    // </tr>

    <tr className="bg-white border-b  hover:bg-gray-50">
      {columns.map((column, index) => (
        <td key={index} className="px-6 py-4">
          {typeof column.row === 'function' ? column.row(row) : column.row}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
