import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, initialFilterData, setFilterData } from '../store/dataSlice';
import { Loading, Table } from 'components/shared';
import { Button } from 'components/ui';
import { useNavigate } from 'react-router-dom';
import { HiPencil, HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { apiRemoveTask } from 'services/TaskService';
import toast from 'react-hot-toast';
import { MdHistory } from 'react-icons/md';
import HistoryPopup from './HistoryPopup';
import { openHistoryPopup } from '../store/stateSlice';
export default function TaskTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.taskList.data.loading);
  const data = useSelector((state) => state.taskList.data.taskList.data);
  const filterData = useSelector((state) => state.taskList.data.filterData);
  const { pageIndex, pageCount, pageSize, sort, query, total } = useSelector(
    (state) => state.taskList?.data.tableData
  );

  // const tableData = useMemo(
  //   () => ({ pageIndex, pageSize, sort, query, total }),
  //   [pageIndex, pageSize, sort, query, total]
  // );
  const handlePageChange = (newPage) => {
    dispatch(getTasks({ ...filterData, page: newPage }));
  };
  const handlePageSizeChange = (newPageSize) => {
    dispatch(setFilterData({ size: newPageSize }));
    dispatch(getTasks({ ...filterData, page: 1, size: newPageSize })); // Fetch data with new page size, reset to first page
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

  const openHistoryPop = (taskId) => {
    dispatch(openHistoryPopup({ taskId }));
  };
  const columns = [
    {
      key: 'title',
      cell: <span>Title & History</span>,
      row: (props) => {
        return (
          <div>
            <span> {props.title}</span>
            <Button
              size="sm"
              icon={<MdHistory />}
              onClick={() => openHistoryPop(props._id)}
              className="bg-amber-500 hover:bg-amber-600 text-white">
              History
            </Button>
          </div>
        );
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
        const getBgColor = (key) => {
          switch (key) {
            case 'pending':
              return 'bg-yellow-500 hover:bg-yellow-600 text-white cursor-not-allowed';
            case 'waiting':
              return 'bg-orange-500 hover:bg-orange-600 text-white cursor-not-allowed';
            case 'completed':
              return 'bg-green-500 hover:bg-green-600 text-white cursor-not-allowed';
            default:
              return 'bg-gray-500';
          }
        };
        return (
          <Button className={`${getBgColor(props.status)} uppercase`} size="sm">
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
              className="bg-blue-500 text-white hover:bg-blue-600"
              size="sm"
              onClick={() => navigate(`/tasks/${props._id}`)}>
              Edit
            </Button>
            <Button
              type="button"
              icon={<HiTrash />}
              size="sm"
              className="bg-red-500 text-white hover:bg-red-600"
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
     {loading ? (
      <Loading />
    ) : (
      <>
        <HistoryPopup />
        <Table
          columns={columns}
          data={data}
          loading={loading}
          currentPage={pageIndex}
          totalPages={pageCount}
          onPageChange={handlePageChange}
          totalItems={total}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </>
    )}
    </>
  );
}
