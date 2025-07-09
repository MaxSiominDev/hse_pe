import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import CreateConspects from './pages/CreateConspects/CreateConspects';
import EditConspects from './pages/CreateConspects/EditConspects';
<<<<<<< Updated upstream
import StorageConspects from './pages/CreateConspects/StorageConspects';
import Premium from './pages/CreateConspects/Premium';

=======
>>>>>>> Stashed changes
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
      {/* Явный путь /create */}
      <Route path="edit" element={<EditConspects />} /> {/* Динамический ID */}
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
