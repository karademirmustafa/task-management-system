import StickyFooter from 'components/shared/StickyFooter';
import { Button, FormContainer, FormItem, Input } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { AiOutlineSave } from 'react-icons/ai';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { apiGetTask, apiEditTask } from 'services/TaskService';
import toast from 'react-hot-toast';
import { Loading } from 'components/shared';
import Select from 'react-select';
import { apiGetAllUsers } from 'services/UserService';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueDate: Yup.date().nullable(),
  status: Yup.string().required('Status is required'),
  assignedTo: Yup.string().nullable() // now
});

const EditTask = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [emailToIdMap, setEmailToIdMap] = useState({});
  useEffect(() => {
    fetchDetails();
    fetchUsers();
  }, []);

  const fetchDetails = async () => {
    try {
      const details = await apiGetTask(params.id);
      if (details.data.status) {
        setData(details.data.data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiGetAllUsers();
      if (response.data.status) {
        setUsers(response.data.data);
        const mapping = response.data.data.reduce((acc, user) => {
          acc[user.email] = user._id;
          return acc;
        }, {});
        setEmailToIdMap(mapping);
      } else {
        // Handle error
      }
    } catch (err) {
      // Handle error
    }
  };
  if (!data) {
    return (
      <div className="flex flex-auto flex-col h-[80vh]">
        <Loading loading={true} />
      </div>
    );
  }
  if (error) {
    return <Navigate to="/access-denied" replace />;
  }

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'waiting', label: 'Waiting' },
    { value: 'completed', label: 'Completed' }
  ];
  const formatDueDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };
  return (
    <div>
      <h5 className={'mb-6'}>Edit Task</h5>
      <Formik
        initialValues={{
          title: data?.title,
          description: data?.description,
          dueDate: formatDueDate(data?.dueDate) || null,
          status: data?.status,
          assignedTo: data?.assignedTo?.email
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const valuesWithId = {
              ...values,
              assignedTo: emailToIdMap[values.assignedTo]
            };
            const response = await apiEditTask(valuesWithId, params.id);

            if (response.data && response.data.status) {
              toast.success('Task successfully edited');

              setTimeout(() => {
                navigate(`/tasks`);
              }, 500);
            } else {
              toast.error(response.data.message);
            }
          } catch (err) {
            toast.error(err?.response?.data?.message || err.toString() || 'Failed to create task');
          }
        }}>
        {({ values, touched, errors, isSubmitting, setFieldValue }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                <FormItem
                  asterisk
                  invalid={errors.title && touched.title}
                  errorMessage={errors.title}
                  label="Title">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="title"
                    placeholder=""
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Description"
                  invalid={errors.description && touched.description}
                  errorMessage={errors.description}>
                  <Field
                    type="text"
                    autoComplete="off"
                    name="description"
                    textArea
                    placeholder=""
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Due Date"
                  invalid={errors.dueDate && touched.dueDate}
                  errorMessage={errors.dueDate}>
                  <Field
                    type="date"
                    autoComplete="off"
                    name="dueDate"
                    placeholder=""
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Status"
                  invalid={errors.status && touched.status}
                  errorMessage={errors.status}>
                  <Field name="status">
                    {({ field, form }) => (
                      <Select
                        options={statusOptions}
                        name="status"
                        value={statusOptions.find((option) => option.value === field.value)}
                        onChange={(option) => form.setFieldValue(field.name, option.value)}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem label="Assign To">
                  <Field name="assignedTo">
                    {({ field, form }) => (
                      <Select
                        options={users.map((user) => ({
                          value: user.email, // Set the value to the user's email
                          label: user.email // Use email as the label
                        }))}
                        name="assignedTo"
                        // The value is the user's email that matches the field value
                        value={
                          users.find((user) => user.email === field.value)
                            ? {
                                value: field.value,
                                label: field.value
                              }
                            : null
                        }
                        // On change, set the field value to the selected user's email
                        onChange={(option) => form.setFieldValue(field.name, option.value)}
                      />
                    )}
                  </Field>
                </FormItem>
              </div>

              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-center py-4"
                stickyClass="border-t bg-white  border-gray-200 ">
                <div className="md:flex items-center gap-2">
                  <Button
                    onClick={() => navigate(`/tasks`)}
                    icon={<HiChevronLeft />}
                    size="sm"
                    className="ltr:mr-3 rtl:ml-3"
                    type="button">
                    Back
                  </Button>
                  <Button size="sm" icon={<AiOutlineSave />} type="submit">
                    Save
                  </Button>
                </div>
              </StickyFooter>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTask;
