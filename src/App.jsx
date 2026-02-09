import { UsersListView } from "./features/users";
import { Toaster } from "react-hot-toast";
import { userService } from "@/services";

function App() {
  return (
    <ReactiveProvider>
      <UsersListView />
      <Toaster />
    </ReactiveProvider>
  );
}

export default App;

const ReactiveProvider = ({ children }) => {
  return <>{children}</>;
};
