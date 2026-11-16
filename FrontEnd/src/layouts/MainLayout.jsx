import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import '../index.css';

export default function MainLayout() {
  return (
    <div id="fondo">
        <div id="aux_fondo">
            <Header></Header>
            <main>
                <Outlet />
            </main>
        </div>
    </div>
  );
}