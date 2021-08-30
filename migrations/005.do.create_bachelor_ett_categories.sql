CREATE TABLE bachelor_ett_categories (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY,
  category_id uuid PRIMARY KEY NOT NULL,
  category TEXT NOT NULL,
  point_value INTEGER NOT NULL,
  date_created TIMESTAMP DEFAULT Now() NOT NULL
);