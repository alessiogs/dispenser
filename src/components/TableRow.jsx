import { useEffect } from "react";

const TableRow = ({ book, authors }) => {
  const authorsNameFormatter = (author) => {
    const name = author.name
      .split(" ")
      .map((name) => `${name[0]}.`)
      .join(" ");

    return name + " " + author.surname;
  };

  useEffect(() => {
    authorsNameFormatter(authors[0]);
  });
  return (
    <tr onClick={() => window.open(book.link, "_blank")}>
      <td>{book.title}</td>
      <td>
        {book.authors
          .map((author) => `${authorsNameFormatter(authors[author])}`)
          .join(",\n")}
      </td>
      <td>{book.language}</td>
    </tr>
  );
};

export default TableRow;
