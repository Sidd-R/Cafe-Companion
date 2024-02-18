dict = {0: [1, 5, 9],
 1: [2],
 2: [1, 2, 5],
 4: [2, 5],
 5: [0, 1, 5],
 6: [2],
 7: [0, 1],
 8: [1, 2]}

users = {1: 'Vikas', 2: 'Satyam', 3: 'Siddhant', 4: 'Navneet', 5: 'Aarav', 6: 'Krish', 7: 'Arjun', 8: 'Kiran', 9: 'Ananya', 10: 'Aryan'}
coffees = {1: 'Espresso', 2: 'South Indian Filter Kaapi', 3: 'Double Restritto', 4: 'Americano', 5: 'Kaapicino', 6: 'Cafe Latte', 7: 'Cappucino', 8: 'Irish Americano', 9: 'Bella\'tte', 10: 'Flat White'}

def suggest():
# Display the result
    # for user_id, coffee_list in suggestion.items():
    print(f"{[coffees[coffee+1] for coffee in dict[0]]}")
    
suggest()