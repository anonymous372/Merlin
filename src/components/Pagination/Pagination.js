function Pagination({ birdsPerPage, totalBirds, paginate }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalBirds / birdsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav style={{ margin: "10px 0" }}>
      <ul className="pagination justify-content-center flex-wrap">
        {pageNumber.map((number) => (
          <li key={number} className="pageItem" style={{ cursor: "pointer" }}>
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
