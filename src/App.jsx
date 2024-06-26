import { useEffect, useState } from "react";
import { authorsList, booksList, subjectsList, topicsList } from "./db";
import Table from "./components/Table";
import Filters from "./components/Filters";
import { concatWithoutDuplicates, sortResults } from "./utils/utils";

const App = () => {
  const [authors, setAuthors] = useState(authorsList);
  const [books, setBooks] = useState(booksList);
  const [topics, setTopics] = useState(topicsList);
  const [subjects, setSubjects] = useState(subjectsList);

  const [filters, setFilters] = useState({
    keyword: "",
    subjects: [],
    topics: [],
    sortBy: "title",
    sortDescendent: true,
  });
  const [filteredResults, setFilteredResults] = useState(
    sortResults(books, filters.sortBy, filters.sortDescendent)
  );

  useEffect(() => {
    if (
      !filters.keyword &&
      !filters.subjects.length &&
      !filters.topics.length
    ) {
      return setFilteredResults(
        sortResults(books, filters.sortBy, filters.sortDescendent)
      );
    }

    let mergedFilteredResults = [];

    if (filters.keyword) {
      const filteredByTitle = books.filter((book) =>
        book.title.toLowerCase().includes(filters.keyword.toLowerCase())
      );

      const matchingAuthors = authors.filter((author) =>
        `${author.name.toLowerCase() + author.surname.toLowerCase()}`.includes(
          filters.keyword.toLowerCase().trim().replace(/\s/g, "")
        )
      );
      const filteredByAuthor = books.filter(
        (book) =>
          matchingAuthors.filter((author) => book.authors.includes(author.id))
            .length
      );

      const filteredByKeyword = concatWithoutDuplicates(
        filteredByTitle,
        filteredByAuthor
      );

      mergedFilteredResults = filteredByKeyword;
    }

    if (filters.subjects.length) {
      const filteredBySubject = books.filter(
        (book) =>
          filters.subjects.filter((subject) => book.subjects.includes(subject))
            .length
      );
      mergedFilteredResults = concatWithoutDuplicates(
        mergedFilteredResults,
        filteredBySubject
      );
    }

    if (filters.topics.length) {
      const filteredByTopic = books.filter(
        (book) =>
          filters.topics.filter((topic) => book.topics.includes(topic)).length
      );
      mergedFilteredResults = concatWithoutDuplicates(
        mergedFilteredResults,
        filteredByTopic
      );
    }

    return setFilteredResults(
      sortResults(mergedFilteredResults, filters.sortBy, filters.sortDescendent)
    );
  }, [filters]);

  return (
    <div className="main-container">
      <h1>Dispenser</h1>
      <div>
        Welcome to Dispenser! Here you can find many resources for your studies!
      </div>
      <div style={{ marginTop: "10px" }}>
        <Filters
          filters={filters}
          setFilters={setFilters}
          subjects={subjects}
          topics={topics}
        />
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
