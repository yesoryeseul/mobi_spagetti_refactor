import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PostListPage from "./pages/Post.list";
import PostDetailPage from "./pages/Post.Detail";
import "./app.css";
import HomePage from "./pages/Home";
import DiaLogProvider from "./contexts/DialogProvider";
import { worker } from "./__mock__/browser";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/posts", element: <PostListPage /> },
    { path: "/post-detail/:postId", element: <PostDetailPage /> },
  ]);
  worker.start();

  return (
    <DiaLogProvider>
      <RouterProvider router={router} />
    </DiaLogProvider>
  );
}

export default App;
