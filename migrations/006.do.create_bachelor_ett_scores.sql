CREATE TABLE bachelor_ett_scores (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY,
  week INTEGER NOT NULL,
  category_id uuid REFERENCES bachelor_ett_categories(category_id) NOT NULL,
  score INTEGER NOT NULL,
  contestant_id uuid REFERENCES bachelor_ett_contestants(contestant_id) NOT NULL,
  season INTEGER NOT NULL,
  date_created TIMESTAMP DEFAULT Now() NOT NULL
);