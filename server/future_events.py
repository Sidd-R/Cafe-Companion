import google.generativeai as genai
import datetime
genai.configure(api_key="AIzaSyAk7gt4eMf1GHY-ZCQBL7LGqNp0c98bK1I")

## function to load Gemini Pro model and get repsonses
model=genai.GenerativeModel(model_name="gemini-pro")
chat = model.start_chat(history=[])

def get_offers():
    today_date = datetime.datetime.now().strftime("%d %b")

    msg = f"""You are Ettara Cafe advisor which is located in Mumbai, India and you help them to improve thier business. Your task is to analyze all future one week events from today's date and suggest list of 3 offers having description and reason, which are effective in increasing business reach and profit. I will give you today's date.\n{today_date}"""

    response=chat.send_message(msg,stream=True)
    final = [chunk.text for chunk in response]
    
    return {
        'events':
        final}



# print(today_date)
# res = get_offers()

# for chunk in res:
#   print(chunk.text)

# print(res)