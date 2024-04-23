import TableRow from "./TableRow";

const Table = ({ books, authors }) => {
  if (!books) return;
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Language</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <TableRow key={book.id} book={book} authors={authors} />
        ))}
        {!books.length && <tr></tr>}
      </tbody>
    </table>
  );
};

export default Table;
