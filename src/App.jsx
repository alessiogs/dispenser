import { useEffect, useState } from "react";
import { authorsList, booksList, subjectsList, topicsList } from "./db";
import Table from "./components/Table";
import Filters from "./components/Filters";

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

      filteredByKeyword = concatWithoutDuplicates(
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
    <div>
      <h1>Dispenser</h1>
      <p>
        Welcome to Dispenser! Here you can find many resources for your studies!
      </p>
      <div className="input-filter-container">
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

const sortResults = (array, entity, descendent) =>
  array.sort((a, b) => {
    if (a[entity] < b[entity]) {
      return descendent ? -1 : 1;
    }
    if (a[entity] > b[entity]) {
      return descendent ? 1 : -1;
    }
    return 0;
  });

const concatWithoutDuplicates = (array1, array2) => {
  return [
    ...array1,
    ...array2.filter(
      (item) =>
        !array1.map((comparingItem) => comparingItem.id).includes(item.id)
    ),
  ];
};
