import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import CreateConspects from './pages/CreateConspects/CreateConspects';
import EditConspects from './pages/CreateConspects/EditConspects';
import StorageConspects from './pages/CreateConspects/StorageConspects';
import Premium from './pages/CreateConspects/Premium';

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
      <Route index element={<CreateConspects />} /> {/* Главная страница */}
      <Route path="create" element={<CreateConspects />} />{' '}
      <Route path="edit/:id" element={<EditConspects />} /> {/* Динамический ID */}
      <Route path="storage" element={<StorageConspects />} />{' '}
      <Route path="premium" element={<Premium />} />{' '}

    </Route>,
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