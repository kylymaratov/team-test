import * as yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';

interface Form {
  email: string;
  number: string;
}

function App() {
  const [users, setUsers] = useState<Form[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController>(
    new AbortController(),
  );

  const initialValues: Form = {
    email: '',
    number: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Incorrect email').required('Email is required'),
  });

  const findUser = async (values: Form) => {
    try {
      setUsers([]);
      setLoading(true);
      controller.abort();

      const newController = new AbortController();
      setController(newController);

      const formattedValues = {
        ...values,
        number: values.number.replace(/-/g, ''),
      };

      const response = await fetch('/api/v1/users/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedValues),
        signal: newController.signal,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setUsers(result);
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;

      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');

    const formatted = cleaned.replace(/(\d{2})(?=\d)/g, '$1-');

    return formatted;
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    const { value } = e.target;
    const formattedValue = formatNumber(value);
    setFieldValue('number', formattedValue);
  };

  return (
    <>
      <div className="mt-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => findUser(values)}
        >
          {({ errors, values, handleSubmit, handleChange, setFieldValue }) => (
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                  value={values.email}
                  onChange={handleChange}
                />

                <span className="text-sm text-red-600">{errors.email}</span>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your number
                </label>
                <input
                  type="text"
                  id="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="221122"
                  value={values.number}
                  onChange={(e) => handleNumberChange(e, setFieldValue)}
                />
                <span className="text-sm text-red-600">{errors.number}</span>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              {loading && <span className="text-white ml-5">Loading...</span>}
            </form>
          )}
        </Formik>
        <div>
          {users.length
            ? users.map((user, id) => (
                <dl
                  key={id}
                  className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 m-auto mt-16"
                >
                  <div className="flex flex-col pb-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      Email address
                    </dt>
                    <dd className="text-lg font-semibold">{user.email}</dd>
                  </div>
                  <div className="flex flex-col pt-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                      number
                    </dt>
                    <dd className="text-lg font-semibold">{user.number}</dd>
                  </div>
                </dl>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default App;
