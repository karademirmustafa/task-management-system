import StickyFooter from 'components/shared/StickyFooter';
import { Button, FormContainer, FormItem, Input } from 'components/ui';
import React from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { AiOutlineSave } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { apiAddTask } from 'services/TaskService';
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  dueDate:Yup.string().nullable() // now
});

const AddTask = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h5 className={'mb-6'}>Add Task</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await apiAddTask(values);

            if(response.data && response.data.status){
              toast.success("Task successfully created")
            
              setTimeout(() => {
                navigate(`/tasks`);
              }, 200);
            }else{
              toast.error(response.data.message);
            }
          } catch (err) {
           toast.error(err?.response?.data?.message || err.toString() || "Failed to create task" );
          }
        }}>
        {({ values, touched, errors, isSubmitting, setFieldValue }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                  <FormItem asterisk invalid={errors.title && touched.title}
                    errorMessage={errors.title} label="Title">
                    <Field
                      type="text"
                      autoComplete="off"
                      name="title"
                      placeholder=""
                      component={Input}
                    />
                  </FormItem>
                  <FormItem label="Description" invalid={errors.description && touched.description}
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
                  <FormItem label="Due Date" invalid={errors.dueDate && touched.dueDate}
                    errorMessage={errors.dueDate}>
                    <Field
                      type="date"
                      autoComplete="off"
                      name="dueDate"
                      placeholder=""
                      component={Input}
                    />
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
                    Geri Dön
                  </Button>
                  <Button size="sm" icon={<AiOutlineSave />} type="submit">
                    Kaydet
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

const initialValues = {
  title:'',
  description:'',
};
export default AddTask;
