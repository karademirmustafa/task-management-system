import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, setFilterDatas, initialFilterData } from '../store/dataSlice';
import { Loading, Table } from 'components/shared';
export default function TaskTable() {
  const dispatch = useDispatch();

  //   const { pageIndex, pageSize, sort, query, total } = useSelector(
  //     (state) => state.taskList?.data.tableData
  //   );

  const loading = useSelector((state) => state.taskList.data.loading);
  const data = useSelector((state) => state.taskList.data.taskList.data);
  //   const tableData = useMemo(
  //     () => ({ pageIndex, pageSize, sort, query, total }),
  //     [pageIndex, pageSize, sort, query, total]
  //   );

  const columns = [
    {
      key: 'title',
      cell: <span>Title</span>,
      row: (props) => {
        return <span>{props.title}</span>;
      }
    },
    {
      key: 'userId.email',
      cell: <span>Created By</span>,
      row: (props) => {
        return (
          <div className="flex flex-col">
            <span>{props.userId.name} </span>
            <span>{props.userId.email} </span>
          </div>
        );
      }
    },
    {
      key: 'assignedTo.email',
      cell: <span>Assigned To</span>,
      row: (props) => {
        return (
          <div className="flex flex-col">
            <span>{props.assignedTo?.name} </span>
            <span>{props.assignedTo?.email} </span>
          </div>
        );
      }
    },
    {
      key: 'description',
      cell: <span>Description</span>,
      row: (props) => {
        return <span>{props.description} </span>;
      }
    },
    {
      key: 'createdAt',
      cell: <span>Created At</span>,
      row: (props) => {
        return <span>{props.createdAt} </span>;
      }
    },
    {
      key: 'dueDate',
      cell: <span>Due Date</span>,
      row: (props) => {
        return <span>{props?.dueDate} </span>;
      }
    },
    {
      key: 'status',
      cell: <span>Status</span>,
      row: (props) => {
        return <span>{props.status} </span>;
      }
    },
    {
      key: '',
      cell: <span>Action</span>,
      row: (props) => {
        return <span>View,Edit </span>;
      }
    }
  ];
  useEffect(() => {
    fetchData();
  }, []);
  //   pageIndex, pageSize, sort
  const fetchData = () => {
    dispatch(getTasks({ ...initialFilterData }));
  };

  return (
    <>
      {loading && <Loading />}
      <Table columns={columns} data={data} loading={loading} />
    </>
  );
}
