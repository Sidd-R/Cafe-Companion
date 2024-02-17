import mysql.connector
import json

def read_sales_data():
    try:
        # Connect to MySQL database
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Apples123mysql*",
            database="coffee"
        )

        if connection.is_connected():
            print("Connected to MySQL database")

            # Create a cursor object to execute queries
            cursor = connection.cursor()

            # Query to select all data from the sales table
            query = "SELECT * FROM sales"

            # Execute the query
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
            #for i in json_data:
            #   print(i)
            return json_data

    except mysql.connector.Error as e:
        print("Error reading data from MySQL table:", e)

    finally:
        # Close the cursor and connection
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed")

# Call the function to read sales data
read_sales_data()
