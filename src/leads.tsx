import { List, Datagrid, TextField, DateField } from 'react-admin';

export const LeadList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <DateField source="created_at" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="value"  />
    </Datagrid>
  </List>
);