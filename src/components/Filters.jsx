const Filters = ({ filters, setFilters, subjects, topics }) => {
  const handleSelectFilter = (item, filterKey) => {
    const isItemSelected = filters[filterKey].includes(item.id);
    setFilters({
      ...filters,
      [filterKey]: isItemSelected
        ? filters[filterKey].filter((entityId) => entityId !== item.id)
        : [...filters[filterKey], item.id],
    });
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-item-label">Subjects</div>
        <div className="filters-container">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`filter ${
                filters.subjects.includes(subject.id) && "filter-selected"
              }`}
              onClick={() => handleSelectFilter(subject, "subjects")}
            >
              {subject.subject}
            </div>
          ))}
        </div>
      </div>
      <div className="filter-container">
        <div className="filter-container">
          <div>Topics</div>
        </div>
        <div className="filters-container">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`filter ${
                filters.topics.includes(topic.id) && "filter-selected"
              }`}
              onClick={() => handleSelectFilter(topic, "topics")}
            >
              {topic.topic}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
