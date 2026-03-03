import { Toaster } from "react-hot-toast";

import { StudentDetailsController } from "@/features/students/StudenDetailsController";

function App() {
  return (
    <ReactiveProvider>
      <StudentDetailsController id={2} />
      <Toaster />
    </ReactiveProvider>
  );
}

export default App;

const ReactiveProvider = ({ children }) => {
  return <>{children}</>;
};
