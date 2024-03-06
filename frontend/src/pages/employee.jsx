import { Helmet } from 'react-helmet-async';

import { EmployeeView } from '../sections/employee/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Employee </title>
      </Helmet>

      <EmployeeView />
    </>
  );
}
