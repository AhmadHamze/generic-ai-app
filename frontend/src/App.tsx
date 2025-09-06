import { Suspense } from "react";
import { Messages } from "./components/Messages";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "6rem",
      }}
    >
      <Suspense fallback={<div>Loading messages...</div>}>
        <Messages />
      </Suspense>
    </div>
  );
}

export default App;
