import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
# from mysql.connector import connect
from datetime import datetime, timedelta
os.environ["PATH"] += r"C:/SeleniumDriver/chrome-win32"



def get_similar_restaurants():
    try:
        similar_restaurants = driver.find_element(By.CLASS_NAME, "hOhlQf")
        # print(similar_restaurants.text)

        similar_attribites = []

        for a in similar_restaurants.find_elements(by=By.TAG_NAME, value="a"):
            similar_attribites.append(a.get_attribute("href"))

        similar_attribites = [x for x in similar_attribites if x != ""]
        similar_attribites = list(set(similar_attribites))

        return similar_attribites
    except:
        return []


def get_more_info():
    try:
        more_info = driver.find_element(By.CLASS_NAME, "sc-bke1zw-0")
        return more_info.text.split("\n")
    except:
        return []


def get_featured():
    try:

        featured = driver.find_element(By.CLASS_NAME, "sc-gDPesD")
        if len(featured.text.split("\n")) > 1:
            return featured.text.split("\n")[1]
        # print(featured.text.split("\n")[0])
    except:
        return None

def get_reviews_and_rating(URL):
    reviews = []
    for x in range(6):
        try:
            driver.get(f"{URL}/reviews?page={x+1}&sort=dd&filter=reviews-dd")
            review_comment = [
                k.text for k in driver.find_elements(By.CLASS_NAME, "dJxGwQ")
            ]
            review_star = [
                k.text for k in driver.find_elements(By.CLASS_NAME, "cILgox")
            ]
            review_name = [
                k.text for k in driver.find_elements(By.CLASS_NAME, "bcCauD")
            ]
            review_time = [
                k.text for k in driver.find_elements(By.CLASS_NAME, "time-stamp")
            ]
            for i in range(len(review_comment)):
                reviews.append(
                    {
                        "comment": review_comment[i],
                        "rating": review_star[i + 2],
                        "name": review_name[i],
                        "time": review_time[i],
                    }
                )

        except:
            print("Error")
            break
    return {
        "reviews": reviews,
        "dining_rating": review_star[0],
        "delivery_rating": review_star[1],
    }

def get_known_for():
    try:
        known_for = driver.find_elements(By.CLASS_NAME, "YQqmV")
        known_for = [k.text for k in known_for]
        print(known_for)
        known_for = known_for[1]
        print(known_for)
        return known_for.split(",")
    except:
        print("Error in getting known for")
        return []

URL = "https://www.zomato.com/mumbai/ettarra-1-juhu"

driver = webdriver.Chrome()

def pipeline(URL='https://www.zomato.com/mumbai/ettarra-1-juhu'):
    response = {}
    
    driver.get(URL)
    get_f = get_featured()
    get_m = get_more_info()
    get_s = get_similar_restaurants()
    known_f = get_known_for()
    rnr = get_reviews_and_rating(URL)

    main = {
        'name': URL.split("/")[-1],
        'featured': get_f,
        'more_info': get_m,
        'similar_restaurants': get_s,
        'reviews': rnr['reviews'],
        'dining_rating': rnr['dining_rating'],
        'delivery_rating': rnr['delivery_rating'],
        'known_for': known_f
    }
    
    response['main'] = main
    response['similar'] = []
    for i in get_s:
        driver.get(i)
        get_f = get_featured()
        get_m = get_more_info()
        known_f = get_known_for()
        rnr = get_reviews_and_rating(i)
        main = {
            'name': i.split("/")[-1],
            'featured': get_f,
            'more_info': get_m,
            'reviews': rnr['reviews'],
            'dining_rating': rnr['dining_rating'],
            'delivery_rating': rnr['delivery_rating'],
            'known_for': known_f
        }
        response['similar'].append(main)
    

    return response