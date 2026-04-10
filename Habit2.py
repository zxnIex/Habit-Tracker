import json

def load_habits():
    habit_dictionary = {}

    try:
        with open("habits2.json", "r", encoding="utf-8") as file:
            habit_dictionary = json.load(file)       
    
    except FileNotFoundError:
        pass

    return habit_dictionary

habit_dictionary = load_habits()

def save_habits(habit_dictionary):
    with open("habits2.json", "w", encoding="utf-8") as file:
        json.dump(habit_dictionary, file, indent = 4)

def add_habit(habit_dictionary):
    habit = input("Habit: ")
    while True:
        habit = input("Habit: ")

        if habit in habit_dictionary:
            print("Habit already exits")
            continue
        
        else:
            habit_dictionary[habit] = []
            save_habits(habit_dictionary)
            return habit_dictionary
    
        
def mark_habit(habit_dictionary, index):
    marker = input("'Y' to mark complete, 'N' to mark incomplete: ")
    habit_name = list(habit_dictionary)[index]
    habit_marker = habit_dictionary[habit_name]

    if marker == "Y":
        habit_marker.append(1)
        save_habits(habit_dictionary)
        return habit_dictionary
    
    elif marker == "N":
        habit_marker.append(0)
        save_habits(habit_dictionary)
        return habit_dictionary
    
    else:
        print("Invalid Choice")

def delete_habit(habit_dictionary, index):
    habit_name = list(habit_dictionary)[index]
    habit_dictionary.pop(habit_name)
    save_habits(habit_dictionary)
    return habit_dictionary

def calculate_streaks(habit_dictionary, index):
    habit_name = list(habit_dictionary)[index]
    habit_marker = habit_dictionary[habit_name]
    current_streak = 0
    max_streak = 0
    for day in habit_marker:
        if day == 1:
            current_streak += 1
            if current_streak > max_streak:
                max_streak = current_streak
                
        elif day == 0:
            current_streak = 0

    return max_streak

def calc_current_streak(habit_dictionary, index):
    habit_name = list(habit_dictionary)[index]
    habit_marker = habit_dictionary[habit_name]
    current_streak = 0
    for day in reversed(habit_marker):
        if day == 1:
            current_streak += 1
        elif day == 0:
            break
    
    return current_streak

def days_tracked(habit_dictionary, index):
    habit_name = list(habit_dictionary)[index]
    habit_marker = habit_dictionary[habit_name]
    total_days = len(habit_marker)
    return total_days

def days_completed(habit_dictionary, index):
    habit_name = list(habit_dictionary)[index]
    habit_marker = habit_dictionary[habit_name]
    complete_days = sum(habit_marker)
    return complete_days



def view_habits(habit_dictionary):
    print("\n")

    for i, (habit, marker) in enumerate(habit_dictionary.items()):
        print(str(i) + ". " + habit + ": " + str(marker))
        max_streak = calculate_streaks(habit_dictionary, i)
        current_streak = calc_current_streak(habit_dictionary, i)
        total_days = days_tracked(habit_dictionary, i)
        complete_days = days_completed(habit_dictionary, i)
        if total_days == 0:
            percentage = 0
        else:
            percentage = 100*complete_days/total_days 
        print("Max Streak For " + habit + " Is: " + str(max_streak))
        print("Current Streak For " + habit + " Is: " + str(current_streak))
        print("Total Days Tracked For " + habit + " Is " + str(total_days))
        print("Total Days Completed For " + habit + " Is " + str(complete_days))
        print("Percentage Complete Is " + str(percentage) + "%")

        print("\n")

while True:
    view_habits(habit_dictionary)

    print("1. Add Habit")
    print("2. Mark Habit")
    print("3. Delete Habit")
    print("4. Exit")

    choice = input("\nChoose Option: ")

    if choice == "1":
        add_habit(habit_dictionary)

    elif choice == "2":
        if not habit_dictionary:
            print("No Habits Available")
            continue

        while True:
            try:
                index = int(input("\nChoose Habit: "))
                if index < 0 or index >= len(habit_dictionary):
                    print("Invalid Index")
                    continue

                mark_habit(habit_dictionary, index)
                break

            except ValueError:
                print("Please input a number: ")
    
    elif choice == "3":
        if not habit_dictionary:
            print("No Habits Available")
            continue

        while True:
            try:
                index = int(input("Choose Habit: "))
                if index < 0 or index >= len(habit_dictionary):
                    print("Invalid Index")
                    continue

                delete_habit(habit_dictionary, index)
                break

            except ValueError:
                print("Please input a number: ")

    elif choice == "4":
        save_habits(habit_dictionary)
        break

    else:
        print("Invalid Choice")

    