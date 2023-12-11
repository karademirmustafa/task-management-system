import { Alert } from 'components/ui';
import Loading from '../Loading';
import Column from './Column';
import TableRow from './TableRow';
import Pagination from './Pagination';

const TableComponent = (props) => {
  const { data = [], columns = [], loading, currentPage, totalPages, onPageChange,totalItems,pageSize ,onPageSizeChange} = props;
  
  return (
    <>
      {loading && <Loading />}
      {!loading && data?.length > 0&& (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  {columns.map((column, index) => (
                    <Column key={index}>{column.cell}</Column>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <TableRow key={i} row={row} columns={columns} />
                ))}
              </tbody>
            </table>
            
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageSizeChange={onPageSizeChange}
              />
          </div>
        </>
      )}

      {!loading && data?.length === 0 && <Alert type="info" >No tasks found in table</Alert>}
    </>
  );
};

export default TableComponent;
