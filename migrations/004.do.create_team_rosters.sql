CREATE TABLE bachelor_ett_rosters (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  ranking_order INTEGER NOT NULL,
  team_id uuid REFERENCES bachelor_ett_teams(team_id) NOT NULL,
  user_id uuid REFERENCES bachelor_ett_users(user_id) NOT NULL,
  contestant_id uuid REFERENCES bachelor_ett_contestants(contestant_id) NOT NULL,
  week INTEGER NOT NULL,
  date_created TIMESTAMP DEFAULT Now() NOT NULL
);