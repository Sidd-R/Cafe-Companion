import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

os.environ['PATH'] += r'C:/SeleniumDriver/chrome-win32'

driver = webdriver.Chrome()
driver.get("https://www.zomato.com/mumbai/ettarra-1-juhu")
# driver.get("https://www.zomato.com/mumbai/earth-cafe-@-juhu-1-juhu")





# more_info = driver.find_element(By.CLASS_NAME, "sc-bke1zw-0")
# print(more_info.text)

# featured = driver.find_element(By.CLASS_NAME, "sc-gDPesD")
# print(featured.text)

similar_restaurants = driver.find_element(By.CLASS_NAME, "dpmxcg")
print(similar_restaurants.text)

# get all hrefs in the 