import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import CreateConspects from './pages/CreateConspects/CreateConspects';
import EditConspects from './pages/CreateConspects/EditConspects';

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<CreateConspects />} />
      <Route path="create" element={<CreateConspects />} />
      {/* Добавляем динамический параметр :id */}
      <Route path="edit/:id" element={<EditConspects />} />
    </Route>
  ),
);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;