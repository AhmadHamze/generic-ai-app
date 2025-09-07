import { Conversation } from "./components/Conversation";

function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "6rem",
        }}
      >
        {/* <Suspense fallback={<div>Loading messages...</div>}>
          <Messages />
        </Suspense> */}
      </div>
      <Conversation />
    </div>
  );
}

export default App;
