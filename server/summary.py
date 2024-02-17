from langchain.prompts import SemanticSimilarityExampleSelector
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.prompts import FewShotPromptTemplate
from langchain.chains.sql_database.prompt import PROMPT_SUFFIX, _mysql_prompt
from langchain.prompts.prompt import PromptTemplate
from urllib.parse import quote
from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain.llms import GooglePalm

api_key = 'AIzaSyAk7gt4eMf1GHY-ZCQBL7LGqNp0c98bK1I'

llm = GooglePalm(google_api_key=api_key, temperature=0.2)
db_user = "root"
db_password = "1234"
db_host = "127.0.0.1"
db_name = "coffee"

encoded_password = quote(db_password)

mysql_uri = f"mysql+pymysql://{db_user}:{encoded_password}@{db_host}/{db_name}"

# print(mysql_uri)

db = SQLDatabase.from_uri(mysql_uri,sample_rows_in_table_info=3)

# print(db.table_info)

# few_shots = [
#     {'Question' : "Give me the top 3 purchased items in my store",
#      'SQLQuery' : "SELECT Item_name FROM sales GROUP BY Item_name ORDER BY SUM(Quantity) DESC LIMIT 3",
#      'SQLResult': "Result of the SQL query",
#      'Answer' : ["Item1", "Item2", "Item3"]},
# ]

# embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')

# to_vectorize = [" ".join(example.values()) for example in few_shots]
# # print(to_vectorize)

# vectorstore = Chroma.from_texts(to_vectorize, embeddings, metadatas=few_shots)

# example_selector = SemanticSimilarityExampleSelector(
#     vectorstore=vectorstore,
#     k=2,
# )

# example_prompt = PromptTemplate(
#     input_variables=["Question", "SQLQuery", "SQLResult","Answer",],
#     template="\nQuestion: {Question}\nSQLQuery: {SQLQuery}\nSQLResult: {SQLResult}\nAnswer: {Answer}",
# )

# few_shot_prompt = FewShotPromptTemplate(
#     example_selector=example_selector,
#     example_prompt=example_prompt,
#     prefix=_mysql_prompt,
#     suffix=PROMPT_SUFFIX,
#     input_variables=["input", "table_info", "top_k"], #These variables are used in the prefix and suffix
# )

new_chain = SQLDatabaseChain.from_llm(llm, my, verbose=True)



def query_database(database_query):    
    result = new_chain(database_query, return_only_outputs=True)
    ans = result['result']

    prompt1 = PromptTemplate.from_template("query: {query}\nanswer:{ans}\n\nSummarize the above information.")

    msg = prompt1.format(query=database_query, ans=ans)
    res = llm(msg)
    return res

# while True:
    # query = input("Enter your query: ")
    # if query == "exit":
    #     break
    # print(query_database(query))