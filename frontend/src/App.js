import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductoScreen from "./screens/ProductoScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import CarritoScreen from "./screens/CarritoScreen";
import SigninScreen from "./screens/SigninScreen";
import DirEnvioScreen from "./screens/DirEnvioScreen";
import SignupScreen from "./screens/SignupScreen";
import MetodoPagoScreen from "./screens/MetodoPagoScreen";
import RealizarPedidoScreen from "./screens/RealizarPedidoScreen";
import OrderScreen from "./screens/OrderScreen";
import HistorialPedidosScreen from "./screens/HistorialPedidosScreen";
import PerfilUsuarioScreen from "./screens/PerfilUsuarioScreen";
import Button from "react-bootstrap/Button";
import { getError } from "./utils";
import axios from "axios";
import BusquedaBox from "./components/BusquedaBox";
import BusquedaScreen from "./screens/BusquedaScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRutas from "./components/AdminRutas";
import ListaProductosScreen from "./screens/ListaProductosScreen";
import EditarProductoScreen from "./screens/EditarProductoScreen";
import OrdenesCompraScreen from "./screens/OrdenesCompraScreen";
import ListaUsuarioScreen from "./screens/ListaUsuarioScreen";
import UserEditScreen from "./screens/UserEditScreen";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? "site-container active-cont d-flex flex-column full-box"
              : "site-container active-cont d-flex flex-column"
            : fullBox
            ? "site-container d-flex flex-column full-box"
            : "site-container d-flex flex-column"
        }
      >
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar bg='primary' variant='dark' expand='lg'>
            <Container>
              <Button
                variant='light'
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className='fas fa-bars'></i>
              </Button>

              <LinkContainer to='/'>
                <Navbar.Brand> Farmacia Vitality</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <BusquedaBox />
                <Nav className='me-auto  w-100  justify-content-end'>
                  <Link to='/cart' className='nav-link'>
                    Carrito de compras
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='danger'>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Perfil de usuario</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/orderhistory'>
                        <NavDropdown.Item>
                          Historial de compras
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className='dropdown-item'
                        to='#signout'
                        onClick={signoutHandler}
                      >
                        Cerrar sesión
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className='nav-link' to='/signin'>
                      Iniciar sesión
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='admin-nav-dropdown'>
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/products'>
                        <NavDropdown.Item>Productos</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item>Ordenes</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Usuarios</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column bg-primary "
              : "side-navbar d-flex justify-content-between flex-wrap flex-column bg-primary"
          }
        >
          <Nav className='flex-column text-white w-100 p-2'>
            <Nav.Item>
              <strong>Categorías</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  className='CategoriasLaterales'
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductoScreen />} />
              <Route path='/cart' element={<CarritoScreen />} />
              <Route path='/search' element={<BusquedaScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <PerfilUsuarioScreen />
                  </ProtectedRoute>
                }
              />
              <Route path='/placeorder' element={<RealizarPedidoScreen />} />
              <Route
                path='/order/:id'
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/orderhistory'
                element={
                  <ProtectedRoute>
                    <HistorialPedidosScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path='/shipping' element={<DirEnvioScreen />}></Route>
              <Route path='/payment' element={<MetodoPagoScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path='/admin/dashboard'
                element={
                  <AdminRutas>
                    <DashboardScreen />
                  </AdminRutas>
                }
              ></Route>
              <Route
                path='/admin/orders'
                element={
                  <AdminRutas>
                    <OrdenesCompraScreen />
                  </AdminRutas>
                }
              ></Route>
              <Route
                path='/admin/users'
                element={
                  <AdminRutas>
                    <ListaUsuarioScreen />
                  </AdminRutas>
                }
              ></Route>
              <Route
                path='/admin/products'
                element={
                  <AdminRutas>
                    <ListaProductosScreen />
                  </AdminRutas>
                }
              ></Route>
              <Route
                path='/admin/product/:id'
                element={
                  <AdminRutas>
                    <EditarProductoScreen />
                  </AdminRutas>
                }
              ></Route>
              <Route
                path='/admin/user/:id'
                element={
                  <AdminRutas>
                    <UserEditScreen />
                  </AdminRutas>
                }
              ></Route>

              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
