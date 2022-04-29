import { Link } from 'react-router-dom';
import './/Navbar.css';

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="linksHeader">
          <Link className="tambah" to="/addPenyakit" style={{ textDecoration: 'none' }}><strong>Tambahkan Penyakit   </strong></Link>
          <Link className = "test" to="/testDNA" style={{ textDecoration: 'none' }}><strong>TestDNA   </strong></Link>
          <Link className = "cari" to="/searchFilter" style={{ textDecoration: 'none' }}><strong>Search Filter   </strong></Link>
        </div>
      </nav>
    );
  }
   
  export default NavBar;