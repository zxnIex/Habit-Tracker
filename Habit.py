import json

def load_habits():
    habit_dictionary = {}

    try:
        with open("habits.json", "r", encoding="utf-8") as file:
            habit_dictionary = json.load(file)       
    
    except FileNotFoundError:
        pass

    return habit_dictionary

habit_dictionary = load_habits()

def save_habits(habit_dictionary):
    with open("habits.json", "w", encoding="utf-8") as file:
        json.dump(habit_dictionary, file, indent = 4)

def add_habit(habit_dictionary):
    habit = input("Habit: ")
    habit_dictionary[habit] = []
    return habit_dictionary
        
def mark_habit(habit_dictionary, index):
    marker = input("'Y' to mark complete, 'N' to mark incomplete: ")
    habit_name = list(habit_dictionary)[index]

    if marker == "Y":
        habit_dictionary[habit_name].append(1)
        return habit_dictionary
    
    elif marker == "N":
        habit_dictionary[habit_name].append(0)
        return habit_dictionary
    
    else:
        print("Invalid Choice")

def delete_habit(habit_dictionary, index):
    habit_delete = list(habit_dictionary)[index]
    habit_dictionary.pop(habit_delete)
    return habit_dictionary

def calculate_streaks(habit_dictionary, index):
    habit_marker = habit_dictionary[list(habit_dictionary)[index]]
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

def view_habits(habit_dictionary):
    for i, (habit, marker) in enumerate(habit_dictionary.items()):
        print(str(i) + ". " + habit + ": " + str(marker))
        max = calculate_streaks(habit_dictionary, i)
        print("Max Streak For " + habit + " Is: " + str(max))
        print("\n")

while True:
    view_habits(habit_dictionary)

    print("\n1. Add Habit")
    print("2. Mark Habit")
    print("3. Delete Habit")
    print("4. Exit")

    choice = input("Choose Option: ")

    if choice == "1":
        add_habit(habit_dictionary)

    elif choice == "2":
        if not habit_dictionary:
            print("No Habits Available")
            continue

        while True:
            try:
                index = int(input("Choose Habit: "))
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
                    break

                delete_habit(habit_dictionary, index)
                break

            except ValueError:
                print("Please input a number: ")

    elif choice == "4":
        save_habits(habit_dictionary)
        break

    else:
        print("Invalid Choice")

    