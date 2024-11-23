import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={styles.navContainer} aria-label="Main Navigation">
      <h1 style={styles.logo}>Bank App</h1>
      <ul style={styles.links}>
        <li style={styles.listItem}>
          <Link to="/" style={styles.link}>
            Accounts
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/account" style={styles.link}>
            Create Account
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/transaction" style={styles.link}>
            Create Transaction
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navContainer: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '15px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
   },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  listItem: {
    margin: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#0056b3', // Slightly darker background on hover
  },
}; 
export default Navigation;
