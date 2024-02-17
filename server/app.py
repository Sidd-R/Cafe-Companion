from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_mysqldb import MySQL

app = Flask(__name__)
socketio = SocketIO(app)

app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "1234"
app.config["MYSQL_DB"] = "coffee"
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# app.config['MYSQL_DATABASE_PORT'] = 3306

mysql = MySQL()
mysql.init_app(app)


@app.get("/menu")
def get_menu():
    # cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM menu")
    description = [x[0] for x in cursor.description]
    result = cursor.fetchall()
    cursor.close()
    menu_objects = []
    for row in result:
        menu_object = dict(zip(description, row))
        menu_objects.append(menu_object)

    return jsonify(menu_objects)


# CREATE TABLE orders (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     name VARCHAR(100),
#     quantity INT,
#     type VARCHAR(100),
#     total FLOAT,
#     customer_no VARCHAR(20),
#     time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
# );


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
    cursor.close()
    order_objects = []
    for row in result:
        order_object = dict(zip(description, row))
        order_objects.append(order_object)
    return order_objects


@app.route("/order", methods=["POST", "GET"])
def order():
    cursor = mysql.connection.cursor()
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


# CREATE TABLE inventory (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     name VARCHAR(100),
#     quantity FLOAT
# );


@app.route("/inventory", methods=["GET", "POST", "PUT"])
def inventory():
    if request.method == "GET":
        cursor = mysql.connection.cursor()
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


# @socketio.on("order_r")

if __name__ == "__main__":
    socketio.run(app, debug=True)
