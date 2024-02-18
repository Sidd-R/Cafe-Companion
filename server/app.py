from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_mysqldb import MySQL
from flask_apscheduler import APScheduler
import logging
# from langchain.prompts import SemanticSimilarityExampleSelector
# from langchain.embeddings import HuggingFaceEmbeddings
# from langchain.vectorstores import Chroma
# from langchain.prompts import FewShotPromptTemplate
# from langchain.chains.sql_database.prompt import PROMPT_SUFFIX, _mysql_prompt
from langchain.prompts.prompt import PromptTemplate
from urllib.parse import quote
from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain.llms import GooglePalm
from flask_cors import CORS, cross_origin
from future_events import get_offers
from web_scraping import pipeline


api_key = 'AIzaSyAk7gt4eMf1GHY-ZCQBL7LGqNp0c98bK1I'

logging.basicConfig(
    filename="server_pipline.log",
    level=logging.DEBUG,
    format="%(asctime)s:%(levelname)s:%(message)s",
)

app = Flask(__name__)
CORS(app, support_credentials=True)
socketio = SocketIO(app)

app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "1234"
app.config["MYSQL_DB"] = "coffee"
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# app.config['MYSQL_DATABASE_PORT'] = 3306

mysql = MySQL()
mysql.init_app(app)

llm = GooglePalm(google_api_key=api_key, temperature=0.2)

db_user = "root"
db_password = "1234"
db_host = "127.0.0.1"
db_name = "coffee"

encoded_password = quote(db_password)

mysql_uri = f"mysql+pymysql://{db_user}:{encoded_password}@{db_host}/{db_name}"

# print(mysql_uri)

db = SQLDatabase.from_uri(mysql_uri,sample_rows_in_table_info=3)

with app.app_context():
    new_chain = SQLDatabaseChain.from_llm(llm, db, verbose=True)

# from summary import query_database

@app.get("/menu")
@cross_origin(supports_credentials=True)
def get_menu():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM menu")
    description = [x[0] for x in cursor.description]
    result = cursor.fetchall()
    cursor.close()
    menu_objects = []
    for row in result:
        menu_object = dict(zip(description, row))
        menu_objects.append(menu_object)

    return jsonify(menu_objects)

def query_database(database_query):    
    result = new_chain(database_query, return_only_outputs=True)
    ans = result['result']

    prompt1 = PromptTemplate.from_template("query: {query}\nanswer:{ans}\n\nSummarize the above information.")

    msg = prompt1.format(query=database_query, ans=ans)
    res = llm(msg)
    return res

def get_orders(cursor, data=None):
    print(data)
    if data:
        cursor.execute(
            "SELECT * FROM orders WHERE customer_no = %s",
            (data,),
        )
    else:
        cursor.execute("SELECT * FROM orders")
    description = [x[0] for x in cursor.description]
    result = cursor.fetchall()
    # cursor.close()
    order_objects = []
    for row in result:
        order_object = dict(zip(description, row))
        order_objects.append(order_object)
    return order_objects


@app.route("/order", methods=["POST", "GET"])
@cross_origin(supports_credentials=True)
def order():
    if request.method == "GET":
        
        if request.args.get("customer_no"):
            return jsonify(get_orders(cursor, request.args.get("customer_no")))
        else:
            return jsonify(get_orders(cursor))
    elif request.method == "POST":
        data = request.json
        
        cursor = mysql.connection.cursor()
        cursor.execute(
            "INSERT INTO orders (name, quantity, type, total, customer_no) VALUES (%s, %s, %s, %s, %s)",
            (
                data["name"],
                data["quantity"],
                data["type"],
                data["total"],
                data["customer_no"],
            ),
        )
        mysql.connection.commit()
        cursor.close()
        socketio.emit("new_order", data)

        return jsonify({"message": "success"})

@app.route("/inventory", methods=["GET", "POST", "PUT"])
@cross_origin(supports_credentials=True)
def inventory():
    cursor = mysql.connection.cursor()
    if request.method == "GET":
        cursor.execute("SELECT * FROM inventory")
        description = [x[0] for x in cursor.description]
        result = cursor.fetchall()
        cursor.close()
        inventory_objects = []
        for row in result:
            inventory_object = dict(zip(description, row))
            inventory_objects.append(inventory_object)
        return jsonify(inventory_objects)
    elif request.method == "POST":
        data = request.json
        cursor = mysql.connection.cursor()
        cursor.execute(
            "INSERT INTO inventory (name, quantity) VALUES (%s, %s)",
            (data["name"], data["quantity"]),
        )
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "success"})
    elif request.method == "PUT":
        data = request.json
        cursor = mysql.connection.cursor()
        cursor.execute(
            "UPDATE inventory SET quantity = %s WHERE name = %s",
            (data["quantity"], data["name"]),
        )
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "success"})

@app.post('/chat')
@cross_origin(supports_credentials=True)
def chat():
    data = request.json
    response = query_database(data['message'])
    return jsonify({"response": response})

@app.get('/sales')
@cross_origin(supports_credentials=True)
def get_sales():
    query = "SELECT * FROM sales"

            # Execute the query
    cursor = mysql.connection.cursor()
    cursor.execute(query)

    column_names = [i[0] for i in cursor.description]

    # Fetch all rows from the result set
    sales_data = cursor.fetchall()
    json_data = []
    for row in sales_data:
        json_row = {}
        for i in range(len(column_names)):
            if row[i] is None:
                json_row[column_names[i]] = ''
            else:
                json_row[column_names[i]] = row[i]
        json_data.append(json_row)

    print(json_data)
    cursor.close()
    #for i in json_data:
    #   print(i)
    return jsonify(json_data)

@app.get('/future_events')
@cross_origin(supports_credentials=True)
def get_future_events():
    # print("Getting future events")
    return jsonify(get_offers())    

@app.get('/pipline')
@cross_origin(supports_credentials=True)
def run_pipline():
    return jsonify(pipeline())

if __name__ == "__main__":
    with app.app_context():
        cursor = mysql.connection.cursor()
    socketio.run(app, debug=True, host="0.0.0.0")
