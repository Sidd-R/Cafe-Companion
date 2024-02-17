from langchain.llms import GooglePalm
from langchain.prompts import PromptTemplate
from transformers import pipeline

api_key = 'AIzaSyAk7gt4eMf1GHY-ZCQBL7LGqNp0c98bK1I'

llm = GooglePalm(google_api_key=api_key, temperature=0.2)



prompt = PromptTemplate.from_template("""You are Ettara Cafe advisor which helps them to improve thier business. Your task is to read the review of customer and suggest 1 improvemnt.
If the review is good just return empty string no need to suggest any improvement.
{sample}

Review: {Query}""")

msg = prompt.format(Query="I ordered a mocha which had specifications but the taste is completely like black coffee without milk and sugar", sample="""Sample response: {
  "Improvement": "Suggestion"
}""")

# print(msg)

response = llm(msg)

print(response)