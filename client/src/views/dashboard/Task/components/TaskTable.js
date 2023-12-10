import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, setFilterDatas, initialFilterData } from '../store/dataSlice';
import { Loading, Table } from 'components/shared';
import { Button } from 'components/ui';
import { useNavigate } from 'react-router-dom';
import { HiPencil, HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { apiRemoveTask } from 'services/TaskService';
import toast from 'react-hot-toast';
export default function TaskTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.taskList.data.loading);
  const data = useSelector((state) => state.taskList.data.taskList.data);

  const { pageIndex, pageCount, pageSize, sort, query, total } = useSelector(
    (state) => state.taskList?.data.tableData
  );
  // const tableData = useMemo(
  //   () => ({ pageIndex, pageSize, sort, query, total }),
  //   [pageIndex, pageSize, sort, query, total]
  // );

  const handlePageChange = (newPage) => {
    dispatch(getTasks({ ...initialFilterData, page: newPage }));
  };
  const handleRemoveTask = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete this task?',
      text: 'This action cannot be undone.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resp = await apiRemoveTask(id);
          if (resp.data.status) {
            dispatch(getTasks(initialFilterData));
            toast.success('Task successfully deleted!');
          } else {
            toast.error('Failed to delete task!');
          }
        } catch (err) {
          toast.error(err?.response?.data?.message || err.toString() || 'Failed to delete task!');
        }
      }
    });
  };

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
        return (
          <Button size="sm" className="uppercase">
            {props.status}{' '}
          </Button>
        );
      }
    },
    {
      key: '',
      cell: <span>Action</span>,
      row: (props) => {
        return (
          <div className="flex gap-4 items-center">
            <Button
              type="button"
              icon={<HiPencil />}
              size="sm"
              onClick={() => navigate(`/tasks/${props._id}`)}>
              Edit
            </Button>
            <Button
              type="button"
              icon={<HiTrash />}
              size="sm"
              onClick={() => {
                handleRemoveTask(props._id);
              }}>
              Remove
            </Button>
          </div>
        );
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
      <Table
        columns={columns}
        data={data}
        loading={loading}
        currentPage={pageIndex}
        totalPages={pageCount}
        onPageChange={handlePageChange}
        totalItems={total}
        pageSize={pageSize}
      />
    </>
  );
}
