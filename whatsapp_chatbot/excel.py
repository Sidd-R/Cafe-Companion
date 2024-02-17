import pandas as pd
from sqlalchemy import create_engine

# Step 3: Read CSV File
df = pd.read_csv('new_purchase.csv')

# Step 4: Establish Database Connection (replace placeholders with your MySQL connection details)
database_url = 'mysql+pymysql://root:Apples123mysql*@localhost:3306/coffee'  # Replace with your MySQL connection details
engine = create_engine(database_url)

# Step 5: Write DataFrame to MySQL Database (replace placeholders with your table name)
table_name = 'purchases'  # Replace with your table name
df.to_sql(table_name, engine, index=False, if_exists='replace')

print(f"Data successfully imported into MySQL table '{table_name}'")