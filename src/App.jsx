import { useEffect, useState } from "react";
import { authorsList, booksList, subjectsList, topicsList } from "./db";
import Table from "./components/Table";

const App = () => {
  const [authors, setAuthors] = useState(authorsList);
  const [books, setBooks] = useState(booksList);
  const [topics, setTopics] = useState(topicsList);
  const [subjexts, setSubjects] = useState(subjectsList);

  const [filters, setFilters] = useState({
    keyword: "",
    subjects: [],
    topics: [],
    sortBy: "title",
    sortDescendent: true,
  });
  const [filteredResults, setFilteredResults] = useState(
    sortResults(books, filters.sortDescendent)
  );

  useEffect(() => {
    if (filters.keyword) {
      const filteredByTitle = books.filter((book) =>
        book.title.toLowerCase().includes(filters.keyword.toLowerCase())
      );

      const matchingAuthors = authors.filter((author) =>
        author.name.toLowerCase().includes(filters.keyword.toLowerCase())
      );
      const filteredByAuthor = books.filter(
        (book) =>
          matchingAuthors.filter((author) => book.authors.includes(author.id))
            .length
      );

      const mergedFilteredResults = [
        ...filteredByTitle,
        ...filteredByAuthor.filter(
          (book) => !filteredByTitle.map((item) => item.id).includes(book.id)
        ),
      ];
      return setFilteredResults(sortResults(mergedFilteredResults));
    }
    setFilteredResults(sortResults(books));
  }, [filters]);

  return (
    <div>
      <h1>Dispenser</h1>
      <p>
        Welcome to Dispenser! Here you can find many resources for your studies!
      </p>
      <div>
        Filters
        <div className="input-filter-container">
          <input
            type="text"
            placeholder="type something..."
            value={filters.keyword}
            onChange={(e) =>
              setFilters({ ...filters, keyword: e.target.value })
            }
          />
        </div>
      </div>
      <Table books={filteredResults} authors={authors} />
    </div>
  );
};

export default App;

const sortResults = (array, descendent) =>
  array.sort((a, b) => {
    if (a.title < b.title) {
      return descendent ? -1 : 1;
    }
    if (a.title > b.title) {
      return descendent ? 1 : -1;
    }
    return 0;
  });
