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
  //   const data = useSelector((state) => state.taskList?.data.taskList.tableData);

  //   const tableData = useMemo(
  //     () => ({ pageIndex, pageSize, sort, query, total }),
  //     [pageIndex, pageSize, sort, query, total]
  //   );

  useEffect(() => {
    fetchData();
  }, []);
  //   pageIndex, pageSize, sort
  const fetchData = () => {
    dispatch(getTasks({ ...initialFilterData }));
  };

  useEffect(() => {}, []);

  return (
    <>
      {loading && <Loading />}
      <Table />
    </>
  );
}
