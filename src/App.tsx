import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import { LeadList } from "./leads";
import { LeadShow } from "./LeadShow";

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} layout={Layout}>
    <Resource name="leads" list={LeadList} show={LeadShow}/>
  </Admin>
);
