from langchain.llms import GooglePalm
api_key = 'AIzaSyAk7gt4eMf1GHY-ZCQBL7LGqNp0c98bK1I'
llm = GooglePalm(google_api_key=api_key, temperature=0.2)
import sys

from langchain.prompts import PromptTemplate

prompt = PromptTemplate.from_template("""You are Coffee Store Manager please provide a structured JSON list of name, item and quantity and type(which has only two types medium and large) which will be mentioned in the input text. Keep the quantity as 1 if it is not mentioned and the item name is given directly and keep the type as medium if it is not mentioned {sample}
Query: {Query}""")

msg = prompt.format(Query= sys.argv[1], sample="""Sample response: {
    "name": "7498696490",
    "items": [{
        "name": "Tall Latte",
        "quantity": 5,
        "type": "medium"
    }, {
        "name": "Cappuccino",
        "quantity": 3,
        "type": "large"
    }, {
        "name": "Irish Coffee",
        "quantity": 4,
        "type": "medium"
    }]
}
""")

# print(msg)

response = llm(msg)

print(response)