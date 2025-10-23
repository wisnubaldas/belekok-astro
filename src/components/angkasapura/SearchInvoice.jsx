export default function SearchInvoice() {
  return (
    <div className="container-fluid px-0">
      {/* Header ringkas halaman */}
      <div className="mb-4">
        <h5 className="fw-bold mb-1 text-uppercase">Cari response invoice </h5>
        <p className="text-muted mb-0">
          Data menampilkan response invoice yang terkirim ke Angkasapura
        </p>
      </div>
      <div className="col-md-12 col-xl-12">
        <div className="misc-wrapper">
          <form onSubmit="return false">
            <div className="mb-0 d-flex gap-6 align-items-center">
              <input type="text" className="form-control form-control-sm" autoFocus />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
