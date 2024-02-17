from urllib.parse import quote
from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain.llms import GooglePalm
from langchain.prompts import PromptTemplate

api_key = 'AIzaSyAk7gt4eMf1GHY-ZCQBL7LGqNp0c98bK1I'

llm = GooglePalm(google_api_key=api_key, temperature=0.2)
db_user = "root"
db_password = "Apples123mysql*"
db_host = "127.0.0.1"
db_name = "coffee"

encoded_password = quote(db_password)

mysql_uri = f"mysql+pymysql://{db_user}:{encoded_password}@{db_host}/{db_name}"

print(mysql_uri)

db = SQLDatabase.from_uri(mysql_uri,sample_rows_in_table_info=3)

print(db.table_info)

db_chain = SQLDatabaseChain.from_llm(llm, db, verbose=True)

def query_database(database_query):    
    result = db_chain(database_query, return_only_outputs=True)
    ans = result['result']

    prompt1 = PromptTemplate.from_template("query: {query}\nanswer:{ans}\n\nSummarize the above information.")

    msg = prompt1.format(query=database_query, ans=ans)
    res = llm(msg)
    return res
  
qns2 = query_database("What will be the profit if I sell 23 bottles of milk")

print(qns2)