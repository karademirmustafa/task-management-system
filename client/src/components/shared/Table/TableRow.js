
const TableRow = ({ row ,columns}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    {columns.map((column, index) => (
      <td key={index} className="px-6 py-4">
        {row[Object.keys(row).find(row => row===column.key)]}
      </td>
    ))}
  </tr>
  )
};

export default TableRow;
