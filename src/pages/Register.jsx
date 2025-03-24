import { useState, useContext } from 'react'; // Add useContext
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import { Footer, Navbar } from "../components";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login from AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shop-co-back.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      login(data.token, formData.email); // Now login is defined
      navigate('/');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="text-danger text-center mb-3">{error}</div>
              )}
              <div className="form my-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  name="username"
                  placeholder="Enter Your Name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-3">
                <p>
                  Already has an account?{' '}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
