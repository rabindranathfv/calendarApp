export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fa-light fa-calendar"></i> Rabindranath
      </span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-danger"></i>
        <span>salir</span>
      </button>
    </div>
  )
}